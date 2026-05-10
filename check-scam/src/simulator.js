import { ethers } from 'ethers';
import logger from './logger.js';

// Minimal ABI for swap simulation
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
  'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
  'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
];

const ERC20_ABI = [
  'function approve(address spender, uint256 amount) external returns (bool)',
  'function balanceOf(address owner) external view returns (uint256)',
  'function transfer(address to, uint256 amount) external returns (bool)',
];

const PANCAKE_ROUTER = '0x10ED43C718714eb63d5aA57B78B54704E256024E';
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';

export class Simulator {
  constructor(provider) {
    this.provider = provider;
  }

  /**
   * Simulate a buy+sell round-trip via eth_call to detect honeypots before spending gas.
   * Returns { isSafe, reason, estimatedLoss }
   */
  async simulateRoundTrip(tokenAddress, amountBnb) {
    try {
      const router = new ethers.Contract(PANCAKE_ROUTER, ROUTER_ABI, this.provider);
      const amountIn = ethers.parseEther(String(amountBnb));
      const path = [WBNB, tokenAddress];
      const reversePath = [tokenAddress, WBNB];

      // 1. Simulate buy — how many tokens do we get?
      let tokensOut;
      try {
        const amountsOut = await router.getAmountsOut(amountIn, path);
        tokensOut = amountsOut[1];
      } catch (err) {
        logger.warn('Buy simulation failed', { token: tokenAddress, err: err.message });
        return { isSafe: false, reason: 'BUY_SIMULATION_FAILED', estimatedLoss: 1 };
      }

      // 2. Simulate sell — how much BNB do we get back for those tokens?
      let bnbBack;
      try {
        const amountsBack = await router.getAmountsOut(tokensOut, reversePath);
        bnbBack = amountsBack[1];
      } catch (err) {
        // If sell simulation reverts, it's almost certainly a honeypot
        logger.warn('Sell simulation reverted — likely honeypot', { token: tokenAddress, err: err.message });
        return { isSafe: false, reason: 'SELL_SIMULATION_REVERTED', estimatedLoss: 1 };
      }

      // 3. Calculate round-trip loss (tax + price impact)
      const lossRatio = 1 - Number(bnbBack) / Number(amountIn);

      // More than 25% round-trip loss is a red flag
      if (lossRatio > 0.25) {
        logger.warn('High round-trip loss — likely honeypot or high tax', {
          token: tokenAddress,
          lossRatio: lossRatio.toFixed(3),
        });
        return { isSafe: false, reason: 'HIGH_ROUND_TRIP_LOSS', estimatedLoss: lossRatio };
      }

      logger.info('Simulation passed', { token: tokenAddress, lossRatio: lossRatio.toFixed(3) });
      return { isSafe: true, reason: 'OK', estimatedLoss: lossRatio };
    } catch (err) {
      logger.error('Simulation error', { token: tokenAddress, err: err.message });
      return { isSafe: false, reason: 'SIMULATION_ERROR', estimatedLoss: 1 };
    }
  }

  /**
   * Check if a token's approve/transferFrom works normally (another honeypot signal).
   */
  async checkTransferability(tokenAddress, holderAddress) {
    try {
      const token = new ethers.Contract(tokenAddress, ERC20_ABI, this.provider);
      // eth_call a transfer to zero address — if it reverts, token may be untransferable
      await token.transfer.staticCall('0x000000000000000000000000000000000000dEaD', 1n, {
        from: holderAddress,
      });
      return { transferable: true };
    } catch (err) {
      const revertMsg = err.message || '';
      const isHoneypot = revertMsg.includes('revert') || revertMsg.includes('CALL_EXCEPTION');
      return { transferable: !isHoneypot, reason: err.message };
    }
  }
}
