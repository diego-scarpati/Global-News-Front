import 'dotenv/config';
import config from './config.js';
import logger from './logger.js';
import { analyzeToken } from './analyzer.js';
import { BscTrader } from './trader-bsc.js';
import { SolTrader } from './trader-sol.js';
import { watchContract, stopWatcher } from './contract-watcher.js';
import { startTelegramMonitor, getHypeScore } from './telegram-monitor.js';
import { getOpenCount, isPositionOpen } from './monitor.js';
import { notifyAlert } from './notifier.js';

const seen = new Set();

async function handleNewToken({ address, chain, pairAddress, source }) {
  const key = `${chain}:${address}`;
  if (seen.has(key)) return;
  seen.add(key);

  logger.info('New token detected', { address, chain, source });

  // Fetch Telegram hype bonus before analysis
  const hypeBonus = getHypeScore(address);

  let analysis;
  try {
    analysis = await analyzeToken({ address, chain, hypeBonus });
  } catch (err) {
    logger.error('Analysis failed', { address, chain, err: err.message });
    return;
  }

  logger.info('Token scored', { address, score: analysis.score, pass: analysis.pass });

  if (!analysis.pass) {
    logger.info('Score below threshold — skipping', { address, score: analysis.score, min: config.strategy.minScore });
    return;
  }

  // Reject known honeypots
  if (analysis.isHoneypot) {
    logger.warn('Honeypot confirmed — skipping', { address });
    return;
  }

  // Don't open more positions than allowed
  if (getOpenCount() >= config.strategy.maxOpenTrades) {
    logger.info('Max open trades reached — skipping', { address });
    return;
  }

  // Don't double-enter a token
  if (isPositionOpen(address)) {
    logger.info('Position already open for token', { address });
    return;
  }

  // Execute buy on appropriate chain
  let trader, txHash;
  try {
    if (chain === 'BSC' && bscTrader) {
      txHash = await bscTrader.buy({ tokenAddress: address, analysis });
    } else if (chain === 'SOL' && solTrader) {
      txHash = await solTrader.buy({ tokenAddress: address, analysis });
    }
  } catch (err) {
    logger.error('Buy failed', { address, chain, err: err.message });
    return;
  }

  // Start anti-rug watcher after successful entry
  if (txHash && txHash !== 'DRY_RUN' && chain === 'BSC' && bscTrader && pairAddress) {
    const sellFn = bscTrader.getSellFn();
    watchContract({
      tokenAddress: address,
      pairAddress,
      provider: bscTrader.provider,
      sellFn,
    });
  }
}

// ─── Bootstrap ───────────────────────────────────────────────────────────────

let bscTrader = null;
let solTrader = null;

async function main() {
  logger.info('='.repeat(60));
  logger.info('Check Scam v2.0 starting', {
    network: config.network,
    dryRun: config.dryRun,
    minScore: config.strategy.minScore,
  });

  if (config.dryRun) {
    logger.info('*** DRY RUN MODE — no real funds will be used ***');
  }

  // Start Telegram monitor (non-blocking)
  startTelegramMonitor().catch((err) => {
    logger.warn('Telegram monitor failed to start', { err: err.message });
  });

  // Initialize traders
  if (config.network === 'BSC' || config.network === 'BOTH') {
    try {
      bscTrader = new BscTrader();
      await bscTrader.startListening((token) => handleNewToken({ ...token, chain: 'BSC' }));
      logger.info('BSC trader started');
    } catch (err) {
      logger.error('BSC trader failed to start', { err: err.message });
      await notifyAlert({ title: 'BSC Trader Error', message: err.message });
    }
  }

  if (config.network === 'SOL' || config.network === 'BOTH') {
    try {
      solTrader = new SolTrader();
      await solTrader.startListening((token) => handleNewToken({ ...token, chain: 'SOL' }));
      logger.info('SOL trader started');
    } catch (err) {
      logger.error('SOL trader failed to start', { err: err.message });
      await notifyAlert({ title: 'SOL Trader Error', message: err.message });
    }
  }

  logger.info('Bot is running. Press Ctrl+C to stop.');

  // Graceful shutdown
  process.on('SIGINT', async () => {
    logger.info('Shutting down...');
    const { stopTelegramMonitor } = await import('./telegram-monitor.js');
    await stopTelegramMonitor();
    process.exit(0);
  });
}

main().catch((err) => {
  logger.error('Fatal error', { err: err.message, stack: err.stack });
  process.exit(1);
});
