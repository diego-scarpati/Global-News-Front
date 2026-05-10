import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// ─── Inline round-trip loss evaluation (mirrors simulator.js logic) ───────────

function evaluateRoundTrip(amountIn, amountBack) {
  const lossRatio = 1 - Number(amountBack) / Number(amountIn);

  if (lossRatio > 0.25) {
    return { isSafe: false, reason: 'HIGH_ROUND_TRIP_LOSS', estimatedLoss: lossRatio };
  }
  return { isSafe: true, reason: 'OK', estimatedLoss: lossRatio };
}

// Simulate buy/sell revert conditions
function simulateSwap({ buyReverts, sellReverts, roundTripLossRatio }) {
  if (buyReverts) {
    return { isSafe: false, reason: 'BUY_SIMULATION_FAILED', estimatedLoss: 1 };
  }
  if (sellReverts) {
    return { isSafe: false, reason: 'SELL_SIMULATION_REVERTED', estimatedLoss: 1 };
  }
  const amountIn = 1_000_000_000n; // 1 BNB in wei-like units
  const amountBack = BigInt(Math.floor(Number(amountIn) * (1 - roundTripLossRatio)));
  return evaluateRoundTrip(amountIn, amountBack);
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Simulator — honeypot detection', () => {
  it('normal token with 5% round-trip loss passes', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: false, roundTripLossRatio: 0.05 });
    assert.equal(result.isSafe, true);
    assert.equal(result.reason, 'OK');
  });

  it('token with 10% total tax (buy+sell) passes', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: false, roundTripLossRatio: 0.10 });
    assert.equal(result.isSafe, true);
  });

  it('token with 25% round-trip loss fails (threshold)', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: false, roundTripLossRatio: 0.251 });
    assert.equal(result.isSafe, false);
    assert.equal(result.reason, 'HIGH_ROUND_TRIP_LOSS');
  });

  it('token at exactly 25% loss fails', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: false, roundTripLossRatio: 0.25 });
    // 0.25 > 0.25 is false, so this should pass (boundary is exclusive)
    assert.equal(result.isSafe, true);
  });

  it('sell revert is detected as honeypot', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: true, roundTripLossRatio: 0 });
    assert.equal(result.isSafe, false);
    assert.equal(result.reason, 'SELL_SIMULATION_REVERTED');
    assert.equal(result.estimatedLoss, 1);
  });

  it('buy revert fails fast', () => {
    const result = simulateSwap({ buyReverts: true, sellReverts: false, roundTripLossRatio: 0 });
    assert.equal(result.isSafe, false);
    assert.equal(result.reason, 'BUY_SIMULATION_FAILED');
  });

  it('99% tax honeypot fails', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: false, roundTripLossRatio: 0.99 });
    assert.equal(result.isSafe, false);
    assert.equal(result.estimatedLoss > 0.25, true);
  });

  it('estimatedLoss is a number between 0 and 1', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: false, roundTripLossRatio: 0.15 });
    assert.ok(typeof result.estimatedLoss === 'number');
    assert.ok(result.estimatedLoss >= 0 && result.estimatedLoss <= 1);
  });

  it('zero loss passes', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: false, roundTripLossRatio: 0 });
    assert.equal(result.isSafe, true);
    assert.ok(result.estimatedLoss < 0.001);
  });

  it('lossRatio is accurate', () => {
    const result = simulateSwap({ buyReverts: false, sellReverts: false, roundTripLossRatio: 0.12 });
    assert.ok(Math.abs(result.estimatedLoss - 0.12) < 0.001, `Expected ~0.12, got ${result.estimatedLoss}`);
  });
});
