import { createLogger, format, transports } from 'winston';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const logsDir = join(__dirname, '..', 'logs');

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss.SSS' }),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, ...meta }) => {
      const metaStr = Object.keys(meta).length ? ' ' + JSON.stringify(meta) : '';
      return `${timestamp} [${level.toUpperCase()}] ${message}${metaStr}`;
    })
  ),
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'HH:mm:ss.SSS' }),
        format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length ? ' ' + JSON.stringify(meta) : '';
          return `${timestamp} [${level}] ${message}${metaStr}`;
        })
      ),
    }),
    new transports.File({
      filename: join(logsDir, 'errors.log'),
      level: 'error',
    }),
    new transports.File({
      filename: join(logsDir, 'check-scam.log'),
    }),
  ],
});

export default logger;
