import { ethers } from 'ethers';
import config from './config.js';
import logger from './logger.js';
import { Simulator } from './simulator.js';
import { adaptAmount } from './anti-bot-adapter.js';
import { sendPrivateTxBsc } from './private-tx.js';
import { openPosition, getOpenCount } from './monitor.js';
import { notifyEntry, notifySkipped } from './notifier.js';

const PANCAKE_ROUTER = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';

const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
  'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
  'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
];

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function balanceOf(address owner) external view returns (uint256)',
  'function decimals() external view returns (uint8)',
];

// BNB/USD price cache (refreshed every 60s)
let bnbUsdPrice = 300;
let bnbPriceLastUpdated = 0;

async function getBnbUsdPrice(provider) {
  if (Date.now() - bnbPriceLastUpdated < 60_000) return bnbUsdPrice;
  try {
    const router = new ethers.Contract(PANCAKE_ROUTER, ROUTER_ABI, provider);
    const amounts = await router.getAmountsOut(ethers.parseEther('1'), [WBNB, BUSD]);
    bnbUsdPrice = parseFloat(ethers.formatUnits(amounts[1], 18));
    bnbPriceLastUpdated = Date.now();
  } catch {
    // use cached value
  }
  return bnbUsdPrice;
}

export class BscTrader {
  constructor() {
    if (!config.bsc.httpUrl) throw new Error('BSC_HTTP_URL not configured');
    this.provider = new ethers.JsonRpcProvider(config.bsc.httpUrl);
    this.wsProvider = config.bsc.wsUrl
      ? new ethers.WebSocketProvider(config.bsc.wsUrl)
      : null;

    if (!config.bsc.privateKey && !config.dryRun) {
      throw new Error('PRIVATE_KEY_BSC not configured');
    }

    if (config.bsc.privateKey) {
      this.wallet = new ethers.Wallet(config.bsc.privateKey, this.provider);
    }

    this.router = new ethers.Contract(PANCAKE_ROUTER, ROUTER_ABI, this.wallet || this.provider);
    this.simulator = new Simulator(this.provider);
  }

  /**
   * Listen for PancakeSwap PairCreated events and trigger analysis.
   */
  async startListening(onNewToken) {
    const FACTORY_ABI = ['event PairCreated(address indexed token0, address indexed token1, address pair, uint)'];
    const FACTORY = '0xcA143Ce32Fe78f1f7019d7d551a6402fC5350c73';

    const provider = this.wsProvider || this.provider;
    const factory = new ethers.Contract(FACTORY, FACTORY_ABI, provider);

    logger.info('BSC: Listening for PairCreated events...');

    factory.on('PairCreated', async (token0, token1, pair) => {
      // Determine which token is the new one (not WBNB)
      const newToken = token0.toLowerCase() === WBNB.toLowerCase() ? token1 : token0;
      logger.info('BSC: New pair detected', { newToken, pair });
      try {
        await onNewToken({ address: newToken, chain: 'BSC', pairAddress: pair });
      } catch (err) {
        logger.error('BSC: onNewToken handler error', { err: err.message });
      }
    });
  }

  /**
   * Execute a buy with block-0 sniping and anti-MEV private TX.
   */
  async buy({ tokenAddress, analysis }) {
    const { score, breakdown, buyTax, pairAddress } = analysis;

    if (getOpenCount() >= config.strategy.maxOpenTrades) {
      logger.info('BSC: Max open trades reached — skipping', { tokenAddress });
      return null;
    }

    const bnbPrice = await getBnbUsdPrice(this.provider);
    const tradeSizeBnb = config.strategy.tradeSizeUsd / bnbPrice;
    const amountIn = ethers.parseEther(tradeSizeBnb.toFixed(6));

    // Pre-entry simulation
    const simResult = await this.simulator.simulateRoundTrip(tokenAddress, tradeSizeBnb);
    if (!simResult.isSafe) {
      logger.warn('BSC: Simulation failed — skipping', { tokenAddress, reason: simResult.reason });
      await notifySkipped({ chain: 'BSC', token: tokenAddress, score, reason: `SIM_FAIL:${simResult.reason}` });
      return null;
    }

    // Calculate min output with slippage
    const path = [WBNB, tokenAddress];
    const amountsOut = await this.router.getAmountsOut(amountIn, path);
    const expectedOut = amountsOut[1];
    const minOut = (expectedOut * BigInt(Math.floor((100 - config.strategy.maxSlippagePct) * 100))) / 10000n;

    // Anti-bot adapter
    const { safeAmount, adjusted, skip } = await adaptAmount(tokenAddress, this.provider, expectedOut);
    if (skip) {
      logger.warn('BSC: Anti-bot adapter says skip', { tokenAddress });
      await notifySkipped({ chain: 'BSC', token: tokenAddress, score, reason: 'ANTI_BOT_TOO_RESTRICTIVE' });
      return null;
    }

    const deadline = Math.floor(Date.now() / 1000) + 60;

    if (config.dryRun) {
      logger.info('BSC DRY RUN: would buy', { tokenAddress, tradeSizeBnb, expectedOut: expectedOut.toString() });
      await notifyEntry({ chain: 'BSC', token: tokenAddress, score, amountUsd: config.strategy.tradeSizeUsd, breakdown });
      // Open a simulated position with mock entry price
      const entryPrice = config.strategy.tradeSizeUsd / parseFloat(ethers.formatEther(expectedOut));
      openPosition({ chain: 'BSC', token: tokenAddress, entryPriceUsd: entryPrice, amountUsd: config.strategy.tradeSizeUsd, amountTokens: expectedOut, buyTxHash: 'DRY_RUN' });
      return 'DRY_RUN';
    }

    // Block-0 snipe: use high gas priority to land in first block
    const feeData = await this.provider.getFeeData();
    const gasPrice = feeData.gasPrice + ethers.parseUnits(String(config.strategy.gasPriorityGwei), 'gwei');

    const txRequest = await this.router.swapExactETHForTokens.populateTransaction(
      minOut,
      path,
      this.wallet.address,
      deadline,
      { value: amountIn, gasPrice, gasLimit: 300_000n }
    );

    const signedTx = await this.wallet.signTransaction(txRequest);

    let txHash;
    try {
      // Try private TX first (anti-MEV)
      txHash = await sendPrivateTxBsc(signedTx);
    } catch {
      // Fall back to public mempool
      logger.warn('BSC: Private TX failed — using public mempool', { tokenAddress });
      const tx = await this.provider.broadcastTransaction(signedTx);
      txHash = tx.hash;
    }

    logger.info('BSC: Buy TX submitted', { tokenAddress, txHash });

    // Wait for confirmation
    const receipt = await this.provider.waitForTransaction(txHash, 1, 30_000);
    if (!receipt || receipt.status !== 1) {
      logger.error('BSC: Buy TX failed', { tokenAddress, txHash });
      return null;
    }

    // Parse actual tokens received from Transfer event
    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider);
    const balance = await tokenContract.balanceOf(this.wallet.address);
    const decimals = await tokenContract.decimals();
    const entryPrice = config.strategy.tradeSizeUsd / parseFloat(ethers.formatUnits(balance, decimals));

    openPosition({
      chain: 'BSC',
      token: tokenAddress,
      entryPriceUsd: entryPrice,
      amountUsd: config.strategy.tradeSizeUsd,
      amountTokens: balance,
      buyTxHash: txHash,
    });

    await notifyEntry({ chain: 'BSC', token: tokenAddress, score, amountUsd: config.strategy.tradeSizeUsd, txHash, breakdown });
    return txHash;
  }

  /**
   * Sell tokens — used by monitor for TP/SL exits.
   */
  async sell(tokenAddress, amountTokens, reason) {
    if (config.dryRun) {
      logger.info('BSC DRY RUN: would sell', { tokenAddress, amountTokens: amountTokens.toString(), reason });
      return 'DRY_RUN';
    }

    const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, this.wallet);
    const approveTx = await tokenContract.approve(PANCAKE_ROUTER, amountTokens);
    await approveTx.wait();

    const path = [tokenAddress, WBNB];
    const amountsOut = await this.router.getAmountsOut(amountTokens, path);
    const minOut = (amountsOut[1] * BigInt(Math.floor((100 - config.strategy.maxSlippagePct) * 100))) / 10000n;
    const deadline = Math.floor(Date.now() / 1000) + 60;

    const tx = await this.router.swapExactTokensForETH(amountTokens, minOut, path, this.wallet.address, deadline, {
      gasLimit: 300_000n,
    });
    const receipt = await tx.wait();
    logger.info('BSC: Sell executed', { tokenAddress, reason, txHash: receipt.hash });
    return receipt.hash;
  }

  getSellFn() {
    return this.sell.bind(this);
  }
}
