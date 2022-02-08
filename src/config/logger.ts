import { createLogger, transports, format } from 'winston';

import { env } from './env';

// https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30
export const logger = createLogger({
  level: env === 'development' ? 'debug' : 'info',
  exitOnError: false,
  format:
    env === 'development'
      ? format.combine(
          format.colorize(),
          format.splat(),
          format.printf(({ level, message, stack }) => `${level}: ${stack || message}`)
        )
      : format.json(),
  transports: [new transports.Console({ stderrLevels: ['error'] })],
});
