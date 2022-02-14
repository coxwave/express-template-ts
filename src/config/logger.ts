import { createLogger, transports, format } from 'winston';

import { ENV } from './env';

// https://docs.datadoghq.com/logs/log_collection/nodejs/?tab=winston30
export const logger = createLogger({
  level: ENV.NODE_ENV === 'development' ? 'debug' : 'info',
  exitOnError: false,
  format:
    ENV.NODE_ENV === 'development'
      ? format.combine(
          format.colorize(),
          format.splat(),
          format.printf(({ level, message, stack }) => `${level}: ${stack || message}`)
        )
      : format.json(),
  transports: [new transports.Console({ stderrLevels: ['error'] })],
});
