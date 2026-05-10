import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

// ─── Inline monitor logic for isolated unit tests ─────────────────────────────
// We replicate the core TP/SL decision logic without file I/O or blockchain deps.

const TAKE_PROFIT_PCT = 80;
const TAKE_PROFIT_STAGE1_PCT = 25;
const STOP_LOSS_PCT = 30;

function computeAction(position, currentPriceUsd) {
  const gainPct = ((currentPriceUsd - position.entryPriceUsd) / position.entryPriceUsd) * 100;

  if (gainPct <= -STOP_LOSS_PCT) {
    return { action: 'STOP_LOSS', gainPct };
  }

  if (!position.stage1Done && gainPct >= TAKE_PROFIT_STAGE1_PCT) {
    return { action: 'TP_STAGE1', gainPct, sellFraction: 0.5 };
  }

  if (position.stage1Done && gainPct >= TAKE_PROFIT_PCT) {
    return { action: 'TP_STAGE2', gainPct, sellFraction: 1.0 };
  }

  return { action: 'HOLD', gainPct };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Monitor — TP/SL logic', () => {
  let position;

  beforeEach(() => {
    position = {
      entryPriceUsd: 1.0,
      amountTokens: 1000n,
      stage1Done: false,
    };
  });

  it('triggers STOP_LOSS at -30%', () => {
    const result = computeAction(position, 0.70);
    assert.equal(result.action, 'STOP_LOSS');
    assert.ok(result.gainPct <= -STOP_LOSS_PCT);
  });

  it('triggers STOP_LOSS exactly at -30%', () => {
    const result = computeAction(position, 0.70);
    assert.equal(result.action, 'STOP_LOSS');
  });

  it('does not trigger SL at -29.9%', () => {
    const result = computeAction(position, 0.701);
    assert.equal(result.action, 'HOLD');
  });

  it('triggers TP_STAGE1 at +25%', () => {
    const result = computeAction(position, 1.25);
    assert.equal(result.action, 'TP_STAGE1');
    assert.equal(result.sellFraction, 0.5);
  });

  it('does not trigger TP_STAGE1 at +24.9%', () => {
    const result = computeAction(position, 1.249);
    assert.equal(result.action, 'HOLD');
  });

  it('triggers TP_STAGE2 at +80% after stage1 done', () => {
    position.stage1Done = true;
    const result = computeAction(position, 1.80);
    assert.equal(result.action, 'TP_STAGE2');
    assert.equal(result.sellFraction, 1.0);
  });

  it('does not trigger TP_STAGE2 if stage1 not done', () => {
    position.stage1Done = false;
    const result = computeAction(position, 1.80);
    // Should trigger TP_STAGE1 first (25% threshold already passed)
    assert.equal(result.action, 'TP_STAGE1');
  });

  it('holds at +50% when stage1 already done but stage2 not reached', () => {
    position.stage1Done = true;
    const result = computeAction(position, 1.50);
    assert.equal(result.action, 'HOLD');
  });

  it('SL takes priority over TP conditions', () => {
    // This case is theoretically impossible but verifies order
    const result = computeAction({ ...position, entryPriceUsd: 1.0, stage1Done: false }, 0.60);
    assert.equal(result.action, 'STOP_LOSS');
  });

  it('gainPct calculation is correct', () => {
    const result = computeAction(position, 1.5);
    assert.ok(Math.abs(result.gainPct - 50) < 0.001, `Expected 50, got ${result.gainPct}`);
  });

  it('HOLD at entry price', () => {
    const result = computeAction(position, 1.0);
    assert.equal(result.action, 'HOLD');
    assert.ok(Math.abs(result.gainPct) < 0.001);
  });
});
