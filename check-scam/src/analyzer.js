import axios from 'axios';
import config from './config.js';
import logger from './logger.js';

const GOPLUS_BASE = 'https://api.gopluslabs.io/api/v1';
const DEXSCREENER_BASE = 'https://api.dexscreener.com/latest/dex';

// Chain IDs for GoPlus
const CHAIN_IDS = { BSC: '56', SOL: 'solana' };

async function fetchGoPlus(chain, tokenAddress) {
  const chainId = CHAIN_IDS[chain] || chain;
  const url =
    chain === 'SOL'
      ? `${GOPLUS_BASE}/solana/token_security?contract_addresses=${tokenAddress}`
      : `${GOPLUS_BASE}/token_security/${chainId}?contract_addresses=${tokenAddress}`;
  try {
    const { data } = await axios.get(url, { timeout: 8000 });
    if (data?.code !== 1) return null;
    const result = data.result?.[tokenAddress.toLowerCase()] || data.result?.[tokenAddress];
    return result || null;
  } catch (err) {
    logger.warn('GoPlus fetch failed', { token: tokenAddress, err: err.message });
    return null;
  }
}

async function fetchDexScreener(chain, tokenAddress) {
  const network = chain === 'BSC' ? 'bsc' : 'solana';
  try {
    const { data } = await axios.get(`${DEXSCREENER_BASE}/tokens/${tokenAddress}`, {
      timeout: 8000,
    });
    const pairs = (data?.pairs || []).filter((p) => p.chainId === network);
    // Return the pair with highest liquidity
    pairs.sort((a, b) => (b.liquidity?.usd || 0) - (a.liquidity?.usd || 0));
    return pairs[0] || null;
  } catch (err) {
    logger.warn('DEXScreener fetch failed', { token: tokenAddress, err: err.message });
    return null;
  }
}

function parseNum(val) {
  const n = parseFloat(val);
  return isNaN(n) ? null : n;
}

function calcScore(gp, dex, hypeBonus = 0) {
  let score = 0;
  const breakdown = {};

  if (!gp) {
    logger.warn('GoPlus data unavailable — score capped at 40');
    // Give partial score from DEX data only
    if (dex) {
      const liq = dex.liquidity?.usd || 0;
      if (liq >= config.strategy.minLiquidityUsd) {
        score += 5;
        breakdown.liquidity = 5;
      }
    }
    breakdown.hype = Math.min(hypeBonus, 20);
    score += breakdown.hype;
    return { score: Math.min(score, 40), breakdown, pass: false };
  }

  // +20 ownership renounced
  if (gp.owner_address === '0x0000000000000000000000000000000000000000' || gp.renounced_ownership === '1') {
    score += 20;
    breakdown.ownershipRenounced = 20;
  }

  // +20 liquidity locked (check LP holders)
  const lpHolders = gp.lp_holders || [];
  const lockedLp = lpHolders.some((h) => h.is_locked === 1 || h.tag === 'burn');
  if (lockedLp) {
    score += 20;
    breakdown.lpLocked = 20;
  }

  // +10 buy tax < 10%
  const buyTax = parseNum(gp.buy_tax);
  if (buyTax !== null && buyTax < 10) {
    score += 10;
    breakdown.buyTax = 10;
  }

  // +10 sell tax < 10%
  const sellTax = parseNum(gp.sell_tax);
  if (sellTax !== null && sellTax < 10) {
    score += 10;
    breakdown.sellTax = 10;
  }

  // +10 not mintable
  if (gp.is_mintable === '0' || gp.is_mintable === 0) {
    score += 10;
    breakdown.notMintable = 10;
  }

  // +10 no blacklist
  if (gp.is_blacklisted === '0' || gp.is_blacklisted === 0) {
    score += 10;
    breakdown.noBlacklist = 10;
  }

  // +10 not honeypot (GoPlus simulation)
  if (gp.is_honeypot === '0' || gp.is_honeypot === 0) {
    score += 10;
    breakdown.notHoneypot = 10;
  }

  // +5 liquidity > minimum (DEXScreener)
  if (dex) {
    const liq = dex.liquidity?.usd || 0;
    if (liq >= config.strategy.minLiquidityUsd) {
      score += 5;
      breakdown.liquidity = 5;
    }
  }

  // +5 top holder < MAX_TOP_HOLDER_PCT
  const holders = gp.holders || [];
  const topHolder = holders[0];
  if (topHolder) {
    const pct = parseFloat(topHolder.percent || 0) * 100;
    if (pct < config.strategy.maxTopHolderPct) {
      score += 5;
      breakdown.topHolder = 5;
    }
  } else {
    // No holder data — give benefit of the doubt
    score += 5;
    breakdown.topHolder = 5;
  }

  // +0 to +20 Telegram hype bonus
  const hype = Math.min(Math.max(Math.round(hypeBonus), 0), 20);
  score += hype;
  breakdown.hype = hype;

  return { score: Math.min(score, 100), breakdown, gp, dex };
}

export async function analyzeToken({ address, chain, hypeBonus = 0 }) {
  logger.info('Analyzing token', { address, chain });

  const [gp, dex] = await Promise.all([
    fetchGoPlus(chain, address),
    fetchDexScreener(chain, address),
  ]);

  const { score, breakdown } = calcScore(gp, dex, hypeBonus);
  const pass = score >= config.strategy.minScore;

  // Extract key metrics for downstream use
  const buyTax = parseNum(gp?.buy_tax) ?? null;
  const sellTax = parseNum(gp?.sell_tax) ?? null;
  const liquidity = dex?.liquidity?.usd ?? null;
  const isHoneypot = gp?.is_honeypot === '1' || gp?.is_honeypot === 1;
  const pairAddress = dex?.pairAddress ?? null;

  // Token age check
  const createdAt = dex?.pairCreatedAt; // ms timestamp
  if (createdAt) {
    const ageMinutes = (Date.now() - createdAt) / 60000;
    if (ageMinutes > config.strategy.maxTokenAgeMinutes) {
      logger.info('Token too old', { address, ageMinutes: ageMinutes.toFixed(1) });
      return { score, breakdown, pass: false, reason: 'TOKEN_TOO_OLD', buyTax, sellTax, liquidity, isHoneypot, pairAddress };
    }
  }

  logger.info('Analysis complete', { address, score, pass, breakdown });
  return { score, breakdown, pass, buyTax, sellTax, liquidity, isHoneypot, pairAddress, gp, dex };
}
