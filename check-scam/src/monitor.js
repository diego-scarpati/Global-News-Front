import config from './config.js';
import logger from './logger.js';
import { notifyExit } from './notifier.js';

const { takeProfitPct, takeProfitStage1Pct, stopLossPct, maxHoldSeconds } = config.strategy;

// Map of open positions keyed by token address
const positions = new Map();

/**
 * Register a new open position after a buy.
 */
export function openPosition({ chain, token, entryPriceUsd, amountUsd, amountTokens, buyTxHash }) {
  if (positions.has(token)) {
    logger.warn('Position already open', { token });
    return;
  }
  const pos = {
    chain,
    token,
    entryPriceUsd,
    amountUsd,
    amountTokens,
    buyTxHash,
    openedAt: Date.now(),
    stage1Done: false, // whether we've taken 50% profit at +25%
    remainingTokens: amountTokens,
  };
  positions.set(token, pos);
  logger.info('Position opened', { chain, token, entryPriceUsd, amountUsd });

  // Set up timeout auto-exit
  setTimeout(() => {
    if (positions.has(token)) {
      logger.info('Position timeout — forcing exit', { token });
      triggerExit(token, 'TIMEOUT', null);
    }
  }, maxHoldSeconds * 1000);
}

/**
 * Update price and check TP/SL conditions.
 * @param {string} token
 * @param {number} currentPriceUsd
 * @param {Function} sellFn - async fn(token, amountTokens, reason) → txHash
 */
export async function checkPosition(token, currentPriceUsd, sellFn) {
  const pos = positions.get(token);
  if (!pos) return;

  const gainPct = ((currentPriceUsd - pos.entryPriceUsd) / pos.entryPriceUsd) * 100;

  // Stop Loss
  if (gainPct <= -stopLossPct) {
    logger.info('Stop loss triggered', { token, gainPct: gainPct.toFixed(2) });
    await triggerExit(token, 'STOP_LOSS', sellFn, pos.remainingTokens, gainPct);
    return;
  }

  // TP Stage 1: sell 50% at +25%
  if (!pos.stage1Done && gainPct >= takeProfitStage1Pct) {
    const sellAmount = pos.amountTokens / 2n;
    logger.info('TP Stage 1 triggered — selling 50%', { token, gainPct: gainPct.toFixed(2) });
    let txHash = null;
    if (sellFn) {
      txHash = await sellFn(token, sellAmount, 'TP_STAGE1');
    }
    pos.stage1Done = true;
    pos.remainingTokens = pos.amountTokens - sellAmount;
    await notifyExit({ chain: pos.chain, token, reason: 'TP_STAGE1 (50%)', pnlPct: gainPct, txHash });
    return;
  }

  // TP Stage 2: sell remaining 50% at configured TP%
  if (pos.stage1Done && gainPct >= takeProfitPct) {
    logger.info('TP Stage 2 triggered — selling remainder', { token, gainPct: gainPct.toFixed(2) });
    await triggerExit(token, 'TP_STAGE2', sellFn, pos.remainingTokens, gainPct);
    return;
  }
}

/**
 * Force close a position (used by anti-rug watcher and timeout).
 */
export async function triggerExit(token, reason, sellFn, amountOverride = null, gainPct = null) {
  const pos = positions.get(token);
  if (!pos) return;

  const sellAmount = amountOverride ?? pos.remainingTokens;
  let txHash = null;

  if (sellFn && sellAmount > 0n) {
    try {
      txHash = await sellFn(token, sellAmount, reason);
    } catch (err) {
      logger.error('Sell failed during exit', { token, reason, err: err.message });
    }
  }

  positions.delete(token);

  await notifyExit({
    chain: pos.chain,
    token,
    reason,
    pnlPct: gainPct ?? 0,
    txHash,
  });

  logger.info('Position closed', { token, reason, txHash });
}

export function getOpenPositions() {
  return Array.from(positions.values());
}

export function getOpenCount() {
  return positions.size;
}

export function isPositionOpen(token) {
  return positions.has(token);
}
