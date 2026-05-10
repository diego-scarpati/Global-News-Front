import { ethers } from 'ethers';
import logger from './logger.js';

const TOKEN_ABI = [
  'function maxTransactionAmount() external view returns (uint256)',
  'function _maxTxAmount() external view returns (uint256)',
  'function maxTxAmount() external view returns (uint256)',
  'function maxWallet() external view returns (uint256)',
  'function _maxWalletSize() external view returns (uint256)',
  'function totalSupply() external view returns (uint256)',
  'function decimals() external view returns (uint8)',
];

// Attempts each known getter name in order, returns null if none found
async function tryRead(contract, methods) {
  for (const method of methods) {
    try {
      const value = await contract[method]();
      return value;
    } catch {
      // method doesn't exist on this token — try next
    }
  }
  return null;
}

/**
 * Detects maxTxAmount and maxWallet restrictions and returns the safe trade amount.
 * @param {string} tokenAddress
 * @param {ethers.Provider} provider
 * @param {bigint} intendedAmountTokens - amount in token wei the bot wants to buy
 * @returns {{ safeAmount: bigint, adjusted: boolean, maxTx: bigint|null, maxWallet: bigint|null }}
 */
export async function adaptAmount(tokenAddress, provider, intendedAmountTokens) {
  try {
    const contract = new ethers.Contract(tokenAddress, TOKEN_ABI, provider);

    const [totalSupply, maxTx, maxWallet] = await Promise.all([
      tryRead(contract, ['totalSupply']),
      tryRead(contract, ['maxTransactionAmount', '_maxTxAmount', 'maxTxAmount']),
      tryRead(contract, ['maxWallet', '_maxWalletSize']),
    ]);

    let safeAmount = intendedAmountTokens;
    let adjusted = false;

    // Apply maxTxAmount constraint — stay 5% below to avoid edge-case reverts
    if (maxTx !== null && maxTx > 0n) {
      const limit = (maxTx * 95n) / 100n;
      if (intendedAmountTokens > limit) {
        safeAmount = limit;
        adjusted = true;
        logger.info('Anti-bot: capped by maxTxAmount', {
          token: tokenAddress,
          original: intendedAmountTokens.toString(),
          capped: safeAmount.toString(),
        });
      }
    }

    // Apply maxWallet constraint — stay 5% below
    if (maxWallet !== null && maxWallet > 0n) {
      const limit = (maxWallet * 95n) / 100n;
      if (safeAmount > limit) {
        safeAmount = limit;
        adjusted = true;
        logger.info('Anti-bot: capped by maxWallet', {
          token: tokenAddress,
          capped: safeAmount.toString(),
        });
      }
    }

    // If adjusted amount is less than 10% of intended, skip — not worth it
    if (adjusted && safeAmount < intendedAmountTokens / 10n) {
      logger.warn('Anti-bot: adjusted amount too small — skipping trade', { token: tokenAddress });
      return { safeAmount: 0n, adjusted, maxTx, maxWallet, skip: true };
    }

    return { safeAmount, adjusted, maxTx, maxWallet, skip: false };
  } catch (err) {
    logger.warn('Anti-bot adapter error — using original amount', { token: tokenAddress, err: err.message });
    return { safeAmount: intendedAmountTokens, adjusted: false, maxTx: null, maxWallet: null, skip: false };
  }
}
