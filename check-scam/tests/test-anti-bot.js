import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

// ─── Inline anti-bot logic for unit testing without blockchain deps ───────────

function adaptAmountInline(intendedAmount, maxTx, maxWallet) {
  let safeAmount = intendedAmount;
  let adjusted = false;

  if (maxTx !== null && maxTx > 0n) {
    const limit = (maxTx * 95n) / 100n;
    if (intendedAmount > limit) {
      safeAmount = limit;
      adjusted = true;
    }
  }

  if (maxWallet !== null && maxWallet > 0n) {
    const limit = (maxWallet * 95n) / 100n;
    if (safeAmount > limit) {
      safeAmount = limit;
      adjusted = true;
    }
  }

  const skip = adjusted && safeAmount < intendedAmount / 10n;

  return { safeAmount, adjusted, skip };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

describe('Anti-bot adapter', () => {
  const intended = 1_000_000n; // 1M tokens

  it('no restrictions — amount unchanged', () => {
    const { safeAmount, adjusted } = adaptAmountInline(intended, null, null);
    assert.equal(safeAmount, intended);
    assert.equal(adjusted, false);
  });

  it('maxTx restriction caps the amount to 95%', () => {
    const maxTx = 500_000n; // max 500k
    const { safeAmount, adjusted } = adaptAmountInline(intended, maxTx, null);
    const expected = (maxTx * 95n) / 100n; // 475k
    assert.equal(safeAmount, expected);
    assert.equal(adjusted, true);
  });

  it('maxWallet restriction caps the amount', () => {
    const { safeAmount, adjusted } = adaptAmountInline(intended, null, 600_000n);
    const expected = (600_000n * 95n) / 100n; // 570k
    assert.equal(safeAmount, expected);
    assert.equal(adjusted, true);
  });

  it('both restrictions — tightest wins', () => {
    // maxTx = 800k → limit 760k
    // maxWallet = 500k → limit 475k
    const { safeAmount } = adaptAmountInline(intended, 800_000n, 500_000n);
    const expected = (500_000n * 95n) / 100n; // 475k
    assert.equal(safeAmount, expected);
  });

  it('no cap needed when amount is below maxTx', () => {
    const small = 100_000n;
    const { safeAmount, adjusted } = adaptAmountInline(small, 500_000n, null);
    assert.equal(safeAmount, small);
    assert.equal(adjusted, false);
  });

  it('skip=true when adjusted amount is less than 10% of intended', () => {
    // intended=1M, maxTx=50k → limit=47.5k < 100k (10% of 1M)
    const { skip } = adaptAmountInline(1_000_000n, 50_000n, null);
    assert.equal(skip, true);
  });

  it('skip=false when adjusted amount is >= 10% of intended', () => {
    // intended=1M, maxTx=200k → limit=190k > 100k
    const { skip } = adaptAmountInline(1_000_000n, 200_000n, null);
    assert.equal(skip, false);
  });

  it('zero maxTx is ignored (no restriction)', () => {
    const { safeAmount, adjusted } = adaptAmountInline(intended, 0n, null);
    assert.equal(safeAmount, intended);
    assert.equal(adjusted, false);
  });

  it('95% buffer is applied correctly for edge values', () => {
    const maxTx = 1_000_000n; // Same as intended
    const { safeAmount, adjusted } = adaptAmountInline(intended, maxTx, null);
    // limit = 950k < 1M → should cap
    assert.equal(safeAmount, 950_000n);
    assert.equal(adjusted, true);
  });

  it('safeAmount is always <= intended', () => {
    const { safeAmount } = adaptAmountInline(intended, 800_000n, 900_000n);
    assert.ok(safeAmount <= intended);
  });
});
