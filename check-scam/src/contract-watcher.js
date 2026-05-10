import { ethers } from 'ethers';
import logger from './logger.js';
import { triggerExit } from './monitor.js';
import { notifyAlert } from './notifier.js';

// Events that signal potential rug
const OWNERSHIP_TRANSFERRED_TOPIC = ethers.id('OwnershipTransferred(address,address)');
const TRANSFER_TOPIC = ethers.id('Transfer(address,address,uint256)');

// LP pair events
const BURN_ADDRESS = '0x000000000000000000000000000000000000dead';
const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

const PAIR_ABI = [
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'event Sync(uint112 reserve0, uint112 reserve1)',
  'function totalSupply() view returns (uint256)',
];

const TOKEN_ABI = [
  'event OwnershipTransferred(address indexed previousOwner, address indexed newOwner)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function totalSupply() view returns (uint256)',
  'function balanceOf(address) view returns (uint256)',
];

// Track active watchers so we can clean up
const activeWatchers = new Map();

/**
 * Start watching a token+pair for rug signals after entry.
 * @param {object} opts
 * @param {string} opts.tokenAddress
 * @param {string} opts.pairAddress - LP pair address (PancakeSwap pair)
 * @param {ethers.Provider} opts.provider
 * @param {Function} opts.sellFn - async fn(token, amount, reason) for emergency exit
 */
export function watchContract({ tokenAddress, pairAddress, provider, sellFn }) {
  if (activeWatchers.has(tokenAddress)) return;

  const token = new ethers.Contract(tokenAddress, TOKEN_ABI, provider);
  const pair = pairAddress ? new ethers.Contract(pairAddress, PAIR_ABI, provider) : null;

  const watchers = [];

  // 1. Watch for OwnershipTransferred to zero/dead — could be renounced (good) or to attacker (bad)
  const ownershipFilter = token.filters.OwnershipTransferred();
  const ownershipHandler = (previousOwner, newOwner, event) => {
    const toZero = newOwner === ZERO_ADDRESS || newOwner.toLowerCase() === BURN_ADDRESS;
    if (!toZero) {
      logger.warn('OwnershipTransferred to non-zero — possible rug', {
        token: tokenAddress,
        previousOwner,
        newOwner,
      });
      notifyAlert({
        title: 'RUG ALERT: Ownership Transfer',
        message: `Token ${tokenAddress}\nNew owner: ${newOwner}`,
      });
      triggerExit(tokenAddress, 'RUG_OWNERSHIP_TRANSFER', sellFn);
    }
  };
  token.on(ownershipFilter, ownershipHandler);
  watchers.push(() => token.off(ownershipFilter, ownershipHandler));

  // 2. Watch LP token transfers — large burn or removal signals rug
  if (pair) {
    const lpSupplyCache = { value: null };

    // Fetch initial LP supply for baseline
    pair.totalSupply().then((s) => { lpSupplyCache.value = s; }).catch(() => {});

    const lpTransferFilter = pair.filters.Transfer();
    const lpTransferHandler = async (from, to, value, event) => {
      // Large removal: LP tokens moved to zero (burn) or large transfer from deployer
      const isBurn = to === ZERO_ADDRESS || to.toLowerCase() === BURN_ADDRESS;
      if (lpSupplyCache.value && value > lpSupplyCache.value / 2n) {
        const pct = Number((value * 100n) / lpSupplyCache.value);
        logger.warn('Large LP removal detected', { pair: pairAddress, pct, isBurn });
        if (!isBurn) {
          notifyAlert({
            title: 'RUG ALERT: LP Removal',
            message: `Pair ${pairAddress}\n${pct}% of LP moved\nTo: ${to}`,
          });
          triggerExit(tokenAddress, 'RUG_LP_REMOVAL', sellFn);
        }
      }
    };
    pair.on(lpTransferFilter, lpTransferHandler);
    watchers.push(() => pair.off(lpTransferFilter, lpTransferHandler));
  }

  // 3. Watch token Transfer events for massive dev wallet sells
  const transferFilter = token.filters.Transfer();
  let totalSupplyCache = null;
  token.totalSupply().then((s) => { totalSupplyCache = s; }).catch(() => {});

  const transferHandler = (from, to, value) => {
    if (!totalSupplyCache) return;
    const pct = Number((value * 100n) / totalSupplyCache);
    // If a single transfer is >10% of supply — suspicious mass sell
    if (pct > 10) {
      logger.warn('Large token transfer detected', {
        token: tokenAddress,
        from,
        pct: pct.toFixed(1),
      });
      notifyAlert({
        title: 'ALERT: Large Token Transfer',
        message: `Token ${tokenAddress}\n${pct.toFixed(1)}% of supply\nFrom: ${from}\nTo: ${to}`,
      });
      // Don't auto-exit on transfers alone — just alert
    }
  };
  token.on(transferFilter, transferHandler);
  watchers.push(() => token.off(transferFilter, transferHandler));

  activeWatchers.set(tokenAddress, watchers);
  logger.info('Contract watcher started', { tokenAddress, pairAddress });
}

export function stopWatcher(tokenAddress) {
  const watchers = activeWatchers.get(tokenAddress);
  if (watchers) {
    watchers.forEach((off) => off());
    activeWatchers.delete(tokenAddress);
    logger.info('Contract watcher stopped', { tokenAddress });
  }
}
