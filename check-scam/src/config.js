import { config as loadDotenv } from 'dotenv';
loadDotenv();

function required(key) {
  const val = process.env[key];
  if (!val) throw new Error(`Missing required env variable: ${key}`);
  return val;
}

function optional(key, defaultValue = '') {
  return process.env[key] || defaultValue;
}

function num(key, defaultValue) {
  const val = process.env[key];
  return val !== undefined ? parseFloat(val) : defaultValue;
}

function bool(key, defaultValue = false) {
  const val = process.env[key];
  if (val === undefined) return defaultValue;
  return val.toLowerCase() === 'true';
}

// Validate network option
const NETWORK = optional('NETWORK', 'BOTH').toUpperCase();
if (!['BOTH', 'BSC', 'SOL'].includes(NETWORK)) {
  throw new Error(`NETWORK must be BOTH, BSC, or SOL. Got: ${NETWORK}`);
}

const config = {
  network: NETWORK,
  dryRun: bool('DRY_RUN', true),

  bsc: {
    wsUrl: optional('BSC_WS_URL'),
    httpUrl: optional('BSC_HTTP_URL'),
    privateKey: optional('PRIVATE_KEY_BSC'),
  },

  sol: {
    wsUrl: optional('SOL_WS_URL', 'wss://api.mainnet-beta.solana.com'),
    httpUrl: optional('SOL_HTTP_URL', 'https://api.mainnet-beta.solana.com'),
    privateKey: optional('PRIVATE_KEY_SOL'),
  },

  strategy: {
    minScore: num('MIN_SCORE', 65),
    tradeSizeUsd: num('TRADE_SIZE_USD', 20),
    takeProfitPct: num('TAKE_PROFIT_PCT', 80),
    stopLossPct: num('STOP_LOSS_PCT', 30),
    maxOpenTrades: num('MAX_OPEN_TRADES', 3),
    maxHoldSeconds: num('MAX_HOLD_SECONDS', 300),
    maxSlippagePct: num('MAX_SLIPPAGE_PCT', 15),
    gasPriorityGwei: num('GAS_PRIORITY_GWEI', 5),
    minLiquidityUsd: num('MIN_LIQUIDITY_USD', 5000),
    maxTokenAgeMinutes: num('MAX_TOKEN_AGE_MINUTES', 10),
    maxTopHolderPct: num('MAX_TOP_HOLDER_PCT', 40),
    // Stage 1 TP: sell 50% at +25%
    takeProfitStage1Pct: 25,
  },

  telegram: {
    apiId: optional('TELEGRAM_API_ID'),
    apiHash: optional('TELEGRAM_API_HASH'),
    session: optional('TELEGRAM_SESSION'),
    token: optional('TELEGRAM_TOKEN'),
    chatId: optional('TELEGRAM_CHAT_ID'),
  },

  privateTx: {
    bscUrl: optional('PRIVATE_TX_BSC_URL', 'https://rpc.48club.io'),
    jitoTipAccount: optional('JITO_TIP_ACCOUNT', '96gYZGLnJYVFmbjzopPSU6QiEV5fGqZNyN9nmNhvrZU5'),
  },
};

export default config;
