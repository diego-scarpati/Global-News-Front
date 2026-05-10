import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// ─── Inline hype scoring logic (mirrors telegram-monitor.js) ──────────────────

const HYPE_KEYWORDS = [
  { pattern: /\b(gem|100x|1000x|moonshot|x\d+)\b/i, weight: 5 },
  { pattern: /\b(new\s+launch|just\s+launched|stealth\s+launch)\b/i, weight: 4 },
  { pattern: /\b(dex\s*screener|trending|trending\s+on)\b/i, weight: 4 },
  { pattern: /\b(vc\s+backed|kol|influencer|alpha)\b/i, weight: 3 },
  { pattern: /\b(audited|doxxed|safu)\b/i, weight: 3 },
  { pattern: /\b(buy\s+now|lp\s+locked|renounced)\b/i, weight: 2 },
  { pattern: /\b(shill|pump|pamp)\b/i, weight: -2 },
];

const BSC_ADDRESS_RE = /\b0x[0-9a-fA-F]{40}\b/g;
const SOL_ADDRESS_RE = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/g;

function calculateMsgHype(text) {
  let hype = 0;
  for (const { pattern, weight } of HYPE_KEYWORDS) {
    if (pattern.test(text)) hype += weight;
  }
  return hype;
}

function extractAddresses(text) {
  const bsc = text.match(BSC_ADDRESS_RE) || [];
  const sol = (text.match(SOL_ADDRESS_RE) || []).filter(
    (addr) => addr.length >= 32 && addr.length <= 44 && !addr.startsWith('0x')
  );
  return [...new Set([...bsc, ...sol])];
}

// Minimal in-memory hype store
class HypeStore {
  constructor() {
    this.store = new Map();
  }

  processMessage(text, channel) {
    const addresses = extractAddresses(text);
    const msgHype = Math.max(calculateMsgHype(text), 0);

    for (const addr of addresses) {
      const key = addr.toLowerCase();
      const existing = this.store.get(key);
      if (existing) {
        existing.mentions += 1;
        existing.hypeScore += msgHype;
        if (!existing.channels.includes(channel)) existing.channels.push(channel);
      } else {
        this.store.set(key, { address: addr, mentions: 1, hypeScore: msgHype, channels: [channel] });
      }
    }
  }

  getHypeScore(address) {
    const entry = this.store.get(address.toLowerCase());
    if (!entry) return 0;
    const mentionScore = Math.min(entry.mentions * 2, 12);
    const keywordScore = Math.min(entry.hypeScore, 8);
    return Math.min(mentionScore + keywordScore, 20);
  }

  get(address) {
    return this.store.get(address.toLowerCase()) || null;
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

const BSC_ADDR = '0x1234567890123456789012345678901234567890';
const SOL_ADDR = 'So11111111111111111111111111111111111111112';

describe('Telegram monitor — hype scoring', () => {
  let store;

  beforeEach(() => { store = new HypeStore(); });

  it('extracts BSC address from message', () => {
    const addrs = extractAddresses(`Check out ${BSC_ADDR} now!`);
    assert.ok(addrs.includes(BSC_ADDR));
  });

  it('extracts SOL address from message', () => {
    const addrs = extractAddresses(`New token: ${SOL_ADDR}`);
    assert.ok(addrs.includes(SOL_ADDR));
  });

  it('first mention gives base hype score', () => {
    store.processMessage(`gem token ${BSC_ADDR}`, 'alpha-channel');
    const score = store.getHypeScore(BSC_ADDR);
    assert.ok(score > 0);
  });

  it('multiple mentions increase hype score', () => {
    store.processMessage(`${BSC_ADDR} gem`, 'ch1');
    store.processMessage(`${BSC_ADDR} gem`, 'ch2');
    store.processMessage(`${BSC_ADDR} gem`, 'ch3');
    const entry = store.get(BSC_ADDR);
    assert.equal(entry.mentions, 3);
  });

  it('hype score is capped at 20', () => {
    for (let i = 0; i < 20; i++) {
      store.processMessage(`${BSC_ADDR} gem 100x moonshot`, `ch${i}`);
    }
    const score = store.getHypeScore(BSC_ADDR);
    assert.ok(score <= 20, `Score ${score} exceeds cap of 20`);
  });

  it('shill keyword reduces hype score', () => {
    const hyped = calculateMsgHype('gem launch');
    const shilled = calculateMsgHype('gem launch shill');
    assert.ok(shilled < hyped, 'Shill keyword should reduce score');
  });

  it('unknown token returns 0 hype', () => {
    const score = store.getHypeScore('0xUnknownAddress000000000000000000000000');
    assert.equal(score, 0);
  });

  it('channels are tracked per-token', () => {
    store.processMessage(`${BSC_ADDR}`, 'ch1');
    store.processMessage(`${BSC_ADDR}`, 'ch2');
    const entry = store.get(BSC_ADDR);
    assert.ok(entry.channels.includes('ch1'));
    assert.ok(entry.channels.includes('ch2'));
    assert.equal(entry.channels.length, 2);
  });

  it('same channel mentioned twice is counted once', () => {
    store.processMessage(`${BSC_ADDR}`, 'alpha');
    store.processMessage(`${BSC_ADDR}`, 'alpha');
    const entry = store.get(BSC_ADDR);
    assert.equal(entry.channels.length, 1);
  });

  it('100x keyword triggers hype', () => {
    const hype = calculateMsgHype('this is a 100x gem');
    assert.ok(hype > 0);
  });

  it('message without keywords gives 0 base hype', () => {
    const hype = calculateMsgHype('just another token launch today');
    assert.equal(hype, 0);
  });

  it('address is case-insensitive in store lookup', () => {
    store.processMessage(BSC_ADDR, 'ch1');
    const lower = store.getHypeScore(BSC_ADDR.toLowerCase());
    const upper = store.getHypeScore(BSC_ADDR.toUpperCase());
    assert.equal(lower, upper);
  });
});
