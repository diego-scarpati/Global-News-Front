import TelegramBot from 'node-telegram-bot-api';
import config from './config.js';
import logger from './logger.js';

let bot = null;

function getBot() {
  if (!bot && config.telegram.token) {
    bot = new TelegramBot(config.telegram.token, { polling: false });
  }
  return bot;
}

function formatScore(score) {
  const bar = '█'.repeat(Math.floor(score / 10)) + '░'.repeat(10 - Math.floor(score / 10));
  return `${bar} ${score}/100`;
}

export async function notifyEntry({ chain, token, score, amountUsd, txHash, breakdown }) {
  const b = getBot();
  if (!b || !config.telegram.chatId) return;

  const msg =
    `🟢 *BUY EXECUTED* [${chain}]\n` +
    `Token: \`${token}\`\n` +
    `Score: ${formatScore(score)}\n` +
    `Amount: $${amountUsd}\n` +
    (txHash ? `TX: \`${txHash}\`\n` : '') +
    `\nBreakdown: ${JSON.stringify(breakdown)}`;

  try {
    await b.sendMessage(config.telegram.chatId, msg, { parse_mode: 'Markdown' });
  } catch (err) {
    logger.warn('Telegram notify failed', { err: err.message });
  }
}

export async function notifyExit({ chain, token, reason, pnlPct, txHash }) {
  const b = getBot();
  if (!b || !config.telegram.chatId) return;

  const emoji = pnlPct >= 0 ? '🟢' : '🔴';
  const msg =
    `${emoji} *SELL EXECUTED* [${chain}]\n` +
    `Token: \`${token}\`\n` +
    `Reason: ${reason}\n` +
    `P&L: ${pnlPct >= 0 ? '+' : ''}${pnlPct.toFixed(1)}%\n` +
    (txHash ? `TX: \`${txHash}\`` : '');

  try {
    await b.sendMessage(config.telegram.chatId, msg, { parse_mode: 'Markdown' });
  } catch (err) {
    logger.warn('Telegram notify failed', { err: err.message });
  }
}

export async function notifyAlert({ title, message }) {
  const b = getBot();
  if (!b || !config.telegram.chatId) return;

  const msg = `⚠️ *${title}*\n${message}`;
  try {
    await b.sendMessage(config.telegram.chatId, msg, { parse_mode: 'Markdown' });
  } catch (err) {
    logger.warn('Telegram notify failed', { err: err.message });
  }
}

export async function notifySkipped({ chain, token, score, reason }) {
  const b = getBot();
  if (!b || !config.telegram.chatId) return;

  const msg =
    `⛔ *SKIPPED* [${chain}]\n` +
    `Token: \`${token}\`\n` +
    `Score: ${score}/100\n` +
    `Reason: ${reason}`;

  try {
    await b.sendMessage(config.telegram.chatId, msg, { parse_mode: 'Markdown' });
  } catch (err) {
    logger.warn('Telegram notify failed', { err: err.message });
  }
}
