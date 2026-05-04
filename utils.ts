import fs from 'fs';
import path from 'path';
import { createLogger, format, transports } from 'winston';

const logDir = 'logs';
const maxSize = 5 * 1024 * 1024; // 5 MB
const maxFiles = '14d'; // Keep logs for 14 days

const transport = new transports.File({
  filename: path.join(logDir, 'app-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: maxSize,
  maxFiles: maxFiles
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level}]: ${message}`;
    })
  ),
  transports: [
    transport,
    new transports.Console({
      format: format.simple(),
    }),
  ],
});

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

export const log = (level: string, message: string) => {
  logger.log({ level, message });
};