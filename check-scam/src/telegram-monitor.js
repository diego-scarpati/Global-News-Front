import { TelegramClient } from 'telegram';
import { StringSession } from 'telegram/sessions/index.js';
import { NewMessage } from 'telegram/events/index.js';
import input from 'input';
import config from './config.js';
import logger from './logger.js';

// Regex patterns to extract contract addresses from messages
const BSC_ADDRESS_RE = /\b0x[0-9a-fA-F]{40}\b/g;
const SOL_ADDRESS_RE = /\b[1-9A-HJ-NP-Za-km-z]{32,44}\b/g;

// Hype signal keywords weighted by relevance
const HYPE_KEYWORDS = [
  { pattern: /\b(gem|100x|1000x|moonshot|x\d+)\b/i, weight: 5 },
  { pattern: /\b(new\s+launch|just\s+launched|stealth\s+launch)\b/i, weight: 4 },
  { pattern: /\b(dex\s*screener|trending|trending\s+on)\b/i, weight: 4 },
  { pattern: /\b(vc\s+backed|kol|influencer|alpha)\b/i, weight: 3 },
  { pattern: /\b(audited|doxxed|safu)\b/i, weight: 3 },
  { pattern: /\b(buy\s+now|lp\s+locked|renounced)\b/i, weight: 2 },
  { pattern: /\b(shill|pump|pamp)\b/i, weight: -2 }, // aggressive shills = suspicious
];

// In-memory store: tokenAddress → { mentions, hypeScore, channels, firstSeen }
const tokenHype = new Map();

export function getHypeScore(tokenAddress) {
  const entry = tokenHype.get(tokenAddress.toLowerCase());
  if (!entry) return 0;
  // Scale mentions to 0-20 bonus points, capped at 20
  const mentionScore = Math.min(entry.mentions * 2, 12);
  const keywordScore = Math.min(entry.hypeScore, 8);
  return Math.min(mentionScore + keywordScore, 20);
}

export function getHypeEntry(tokenAddress) {
  return tokenHype.get(tokenAddress.toLowerCase()) || null;
}

function processMessage(text, channelTitle) {
  if (!text) return;

  // Extract BSC addresses
  const bscMatches = text.match(BSC_ADDRESS_RE) || [];
  // Extract SOL addresses (filter out common false positives)
  const solMatches = (text.match(SOL_ADDRESS_RE) || []).filter(
    (addr) => addr.length >= 32 && addr.length <= 44 && !addr.startsWith('0x')
  );

  const addresses = [...new Set([...bscMatches, ...solMatches])];

  // Calculate keyword hype score for this message
  let msgHype = 0;
  for (const { pattern, weight } of HYPE_KEYWORDS) {
    if (pattern.test(text)) msgHype += weight;
  }

  for (const addr of addresses) {
    const key = addr.toLowerCase();
    const existing = tokenHype.get(key);
    if (existing) {
      existing.mentions += 1;
      existing.hypeScore += Math.max(msgHype, 0);
      if (!existing.channels.includes(channelTitle)) {
        existing.channels.push(channelTitle);
      }
      existing.lastSeen = Date.now();
    } else {
      tokenHype.set(key, {
        address: addr,
        mentions: 1,
        hypeScore: Math.max(msgHype, 0),
        channels: [channelTitle],
        firstSeen: Date.now(),
        lastSeen: Date.now(),
      });
    }
  }
}

// Prune tokens older than 30 minutes to prevent memory leak
function pruneOldEntries() {
  const cutoff = Date.now() - 30 * 60 * 1000;
  for (const [key, entry] of tokenHype) {
    if (entry.lastSeen < cutoff) {
      tokenHype.delete(key);
    }
  }
}

let client = null;

export async function startTelegramMonitor() {
  if (!config.telegram.apiId || !config.telegram.apiHash) {
    logger.warn('Telegram monitor disabled — TELEGRAM_API_ID/HASH not set');
    return;
  }

  const apiId = parseInt(config.telegram.apiId, 10);
  const apiHash = config.telegram.apiHash;
  const session = new StringSession(config.telegram.session || '');

  client = new TelegramClient(session, apiId, apiHash, {
    connectionRetries: 5,
  });

  await client.start({
    phoneNumber: async () => input.text('Enter your Telegram phone number: '),
    password: async () => input.text('Enter your 2FA password (if any): '),
    phoneCode: async () => input.text('Enter the verification code: '),
    onError: (err) => logger.error('Telegram auth error', { err: err.message }),
  });

  // Save session string for future runs
  const savedSession = client.session.save();
  if (savedSession !== config.telegram.session) {
    logger.info('New Telegram session saved — update TELEGRAM_SESSION in .env', { session: savedSession });
    process.env.TELEGRAM_SESSION = savedSession;
  }

  logger.info('Telegram monitor connected');

  // Listen to all new messages across all joined channels/groups
  client.addEventHandler((event) => {
    const msg = event.message;
    if (!msg?.text) return;
    const channelTitle = msg.chat?.title || msg.chat?.username || 'unknown';
    processMessage(msg.text, channelTitle);
  }, new NewMessage({}));

  // Prune old entries every 5 minutes
  setInterval(pruneOldEntries, 5 * 60 * 1000);

  logger.info('Telegram monitor listening to joined channels');
}

export async function stopTelegramMonitor() {
  if (client) {
    await client.disconnect();
    client = null;
  }
}
