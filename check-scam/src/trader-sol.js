import {
  Connection,
  Keypair,
  PublicKey,
  VersionedTransaction,
  LAMPORTS_PER_SOL,
} from '@solana/web3.js';
import axios from 'axios';
import bs58 from 'bs58';
import config from './config.js';
import logger from './logger.js';
import { openPosition, getOpenCount } from './monitor.js';
import { notifyEntry, notifySkipped } from './notifier.js';
import { sendJitoBundle } from './private-tx.js';

const JUPITER_QUOTE_URL = 'https://quote-api.jup.ag/v6/quote';
const JUPITER_SWAP_URL = 'https://quote-api.jup.ag/v6/swap';
const SOL_MINT = 'So11111111111111111111111111111111111111112';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

// SOL/USD price cache
let solUsdPrice = 150;
let solPriceLastUpdated = 0;

async function getSolUsdPrice(connection) {
  if (Date.now() - solPriceLastUpdated < 60_000) return solUsdPrice;
  try {
    const { data } = await axios.get(
      `${JUPITER_QUOTE_URL}?inputMint=${SOL_MINT}&outputMint=${USDC_MINT}&amount=1000000000`,
      { timeout: 5000 }
    );
    solUsdPrice = parseFloat(data.outAmount) / 1_000_000;
    solPriceLastUpdated = Date.now();
  } catch {
    // use cached
  }
  return solUsdPrice;
}

export class SolTrader {
  constructor() {
    if (!config.sol.httpUrl) throw new Error('SOL_HTTP_URL not configured');

    this.connection = new Connection(config.sol.httpUrl, {
      commitment: 'confirmed',
      wsEndpoint: config.sol.wsUrl || undefined,
    });

    if (config.sol.privateKey && !config.dryRun) {
      const decoded = bs58.decode(config.sol.privateKey);
      this.keypair = Keypair.fromSecretKey(decoded);
      logger.info('SOL wallet loaded', { address: this.keypair.publicKey.toBase58() });
    }
  }

  /**
   * Listen for new Raydium pools and Pump.fun token launches.
   */
  async startListening(onNewToken) {
    // Raydium AMM program ID
    const RAYDIUM_AMM = new PublicKey('675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8');

    logger.info('SOL: Subscribing to Raydium pool logs...');

    this.connection.onLogs(
      RAYDIUM_AMM,
      async (logs) => {
        if (!logs.logs.some((l) => l.includes('initialize2'))) return;
        // Parse new token mint from logs
        const mintMatch = logs.logs.find((l) => l.includes('mint'));
        if (!mintMatch) return;
        const parts = mintMatch.split(' ');
        const mintAddress = parts[parts.length - 1];
        if (!mintAddress || mintAddress.length < 32) return;

        logger.info('SOL: New Raydium pool', { mint: mintAddress });
        try {
          await onNewToken({ address: mintAddress, chain: 'SOL', source: 'raydium' });
        } catch (err) {
          logger.error('SOL: onNewToken error', { err: err.message });
        }
      },
      'confirmed'
    );

    // Pump.fun program
    const PUMP_FUN = new PublicKey('6EF8rrecthR5Dkzon8Nwu78hRvfCKubJ14M5uBEwF6P');
    this.connection.onLogs(
      PUMP_FUN,
      async (logs) => {
        if (!logs.logs.some((l) => l.includes('MintTo'))) return;
        const sig = logs.signature;
        try {
          const tx = await this.connection.getParsedTransaction(sig, { maxSupportedTransactionVersion: 0 });
          const mint = tx?.meta?.postTokenBalances?.[0]?.mint;
          if (mint) {
            logger.info('SOL: New Pump.fun token', { mint });
            await onNewToken({ address: mint, chain: 'SOL', source: 'pumpfun' });
          }
        } catch (err) {
          logger.error('SOL: Pump.fun parse error', { err: err.message });
        }
      },
      'confirmed'
    );

    logger.info('SOL: Listening for new tokens...');
  }

  async getJupiterQuote(inputMint, outputMint, amountLamports) {
    const { data } = await axios.get(JUPITER_QUOTE_URL, {
      params: {
        inputMint,
        outputMint,
        amount: amountLamports,
        slippageBps: Math.floor(config.strategy.maxSlippagePct * 100),
      },
      timeout: 8000,
    });
    return data;
  }

  async buy({ tokenAddress, analysis }) {
    const { score, breakdown } = analysis;

    if (getOpenCount() >= config.strategy.maxOpenTrades) {
      logger.info('SOL: Max open trades reached', { tokenAddress });
      return null;
    }

    const solPrice = await getSolUsdPrice(this.connection);
    const tradeSizeSol = config.strategy.tradeSizeUsd / solPrice;
    const lamports = Math.floor(tradeSizeSol * LAMPORTS_PER_SOL);

    // Get Jupiter quote
    let quote;
    try {
      quote = await this.getJupiterQuote(SOL_MINT, tokenAddress, lamports);
    } catch (err) {
      logger.warn('SOL: Jupiter quote failed', { tokenAddress, err: err.message });
      await notifySkipped({ chain: 'SOL', token: tokenAddress, score, reason: 'JUPITER_QUOTE_FAILED' });
      return null;
    }

    if (config.dryRun) {
      logger.info('SOL DRY RUN: would buy', {
        tokenAddress,
        tradeSizeSol,
        expectedOut: quote.outAmount,
      });
      const entryPrice = config.strategy.tradeSizeUsd / (parseFloat(quote.outAmount) / 1e9);
      openPosition({
        chain: 'SOL',
        token: tokenAddress,
        entryPriceUsd: entryPrice,
        amountUsd: config.strategy.tradeSizeUsd,
        amountTokens: BigInt(quote.outAmount),
        buyTxHash: 'DRY_RUN',
      });
      await notifyEntry({ chain: 'SOL', token: tokenAddress, score, amountUsd: config.strategy.tradeSizeUsd, breakdown });
      return 'DRY_RUN';
    }

    if (!this.keypair) {
      logger.error('SOL: No keypair configured for live trading');
      return null;
    }

    // Get swap transaction from Jupiter
    const { data: swapData } = await axios.post(
      JUPITER_SWAP_URL,
      {
        quoteResponse: quote,
        userPublicKey: this.keypair.publicKey.toBase58(),
        wrapAndUnwrapSol: true,
        prioritizationFeeLamports: 50_000,
      },
      { timeout: 10_000 }
    );

    const swapTxBuf = Buffer.from(swapData.swapTransaction, 'base64');
    const tx = VersionedTransaction.deserialize(swapTxBuf);

    // Sign
    tx.sign([this.keypair]);

    let txHash;
    try {
      // Try Jito bundle for MEV protection
      const bundleId = await sendJitoBundle([tx], this.connection);
      txHash = bundleId;
    } catch {
      // Fallback to regular send
      logger.warn('SOL: Jito bundle failed — using regular send', { tokenAddress });
      txHash = await this.connection.sendRawTransaction(tx.serialize(), {
        skipPreflight: false,
        maxRetries: 3,
      });
    }

    logger.info('SOL: Buy TX submitted', { tokenAddress, txHash });

    // Confirm
    const { value: status } = await this.connection.confirmTransaction(txHash, 'confirmed');
    if (status?.err) {
      logger.error('SOL: Buy TX failed', { tokenAddress, txHash, err: status.err });
      return null;
    }

    const amountTokens = BigInt(quote.outAmount);
    const entryPrice = config.strategy.tradeSizeUsd / (parseFloat(quote.outAmount) / 1e9);

    openPosition({
      chain: 'SOL',
      token: tokenAddress,
      entryPriceUsd: entryPrice,
      amountUsd: config.strategy.tradeSizeUsd,
      amountTokens,
      buyTxHash: txHash,
    });

    await notifyEntry({ chain: 'SOL', token: tokenAddress, score, amountUsd: config.strategy.tradeSizeUsd, txHash, breakdown });
    return txHash;
  }

  async sell(tokenAddress, amountTokens, reason) {
    if (config.dryRun) {
      logger.info('SOL DRY RUN: would sell', { tokenAddress, amountTokens: amountTokens.toString(), reason });
      return 'DRY_RUN';
    }

    if (!this.keypair) {
      logger.error('SOL: No keypair for sell');
      return null;
    }

    const quote = await this.getJupiterQuote(tokenAddress, SOL_MINT, amountTokens.toString());

    const { data: swapData } = await axios.post(JUPITER_SWAP_URL, {
      quoteResponse: quote,
      userPublicKey: this.keypair.publicKey.toBase58(),
      wrapAndUnwrapSol: true,
      prioritizationFeeLamports: 50_000,
    });

    const tx = VersionedTransaction.deserialize(Buffer.from(swapData.swapTransaction, 'base64'));
    tx.sign([this.keypair]);

    const txHash = await this.connection.sendRawTransaction(tx.serialize(), { maxRetries: 3 });
    await this.connection.confirmTransaction(txHash, 'confirmed');
    logger.info('SOL: Sell executed', { tokenAddress, reason, txHash });
    return txHash;
  }

  getSellFn() {
    return this.sell.bind(this);
  }
}
