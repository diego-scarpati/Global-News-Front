import axios from 'axios';
import { ethers } from 'ethers';
import config from './config.js';
import logger from './logger.js';

/**
 * BSC: Send a raw signed transaction through 48Club / BlockRazor private mempool
 * to avoid MEV frontrunning.
 */
export async function sendPrivateTxBsc(signedTx) {
  const endpoint = config.privateTx.bscUrl;
  if (!endpoint) {
    throw new Error('PRIVATE_TX_BSC_URL not configured');
  }

  const payload = {
    jsonrpc: '2.0',
    method: 'eth_sendRawTransaction',
    params: [signedTx],
    id: 1,
  };

  try {
    const { data } = await axios.post(endpoint, payload, { timeout: 10000 });
    if (data.error) {
      throw new Error(`Private TX error: ${JSON.stringify(data.error)}`);
    }
    const txHash = data.result;
    logger.info('Private BSC TX submitted', { txHash, endpoint });
    return txHash;
  } catch (err) {
    logger.error('Failed to send private BSC TX', { err: err.message });
    throw err;
  }
}

/**
 * SOL: Submit a Jito bundle for MEV protection.
 * Bundles up to 5 transactions that execute atomically.
 */
export async function sendJitoBundle(transactions, connection) {
  // Jito block engine endpoint
  const JITO_ENDPOINT = 'https://mainnet.block-engine.jito.wtf/api/v1/bundles';

  // Serialize transactions to base64
  const serialized = transactions.map((tx) => {
    const buf = Buffer.from(tx.serialize());
    return buf.toString('base64');
  });

  const payload = {
    jsonrpc: '2.0',
    id: 1,
    method: 'sendBundle',
    params: [serialized],
  };

  try {
    const { data } = await axios.post(JITO_ENDPOINT, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 15000,
    });

    if (data.error) {
      throw new Error(`Jito bundle error: ${JSON.stringify(data.error)}`);
    }

    const bundleId = data.result;
    logger.info('Jito bundle submitted', { bundleId });
    return bundleId;
  } catch (err) {
    logger.error('Failed to send Jito bundle', { err: err.message });
    throw err;
  }
}

/**
 * Add a Jito tip instruction to a transaction for bundle priority.
 * @param {import('@solana/web3.js').Transaction} tx
 * @param {import('@solana/web3.js').PublicKey} payer
 * @param {number} tipLamports - tip in lamports (e.g. 10000 = 0.00001 SOL)
 */
export function addJitoTip(tx, payer, tipLamports = 10_000) {
  const { SystemProgram, PublicKey } = await import('@solana/web3.js');
  const tipAccount = new PublicKey(config.privateTx.jitoTipAccount);
  const tipIx = SystemProgram.transfer({
    fromPubkey: payer,
    toPubkey: tipAccount,
    lamports: tipLamports,
  });
  tx.add(tipIx);
  return tx;
}
