import 'module-alias/register';

import * as compression from 'compression';
import * as express from 'express';
import helmet from 'helmet';

import { ENV } from '@config/env';
import { logger } from '@config/logger';

import { errorConverter, errorHandler } from '@middlewares/error';

import { ApiError } from '@utils/api-error';

const app = express();

// Middlewares
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'script-src': [
          "'self'",
          "'sha256-IB/K+MLJaMDSrzPe7FKDbstuatbjqAyt0Z9JCmfug4k='",
          "'unsafe-eval'",
        ],
      },
    },
  })
);
app.use(compression());
app.use(express.static('docs'));

// 404 Not Found
app.all('*', (_req, _res, next) => {
  next(new ApiError('NotFound'));
});

// Convert error to ApiError, if needed.
app.use(errorConverter);

// Error Handler
app.use(errorHandler);

app.listen(ENV.DOCS_PORT, () => {
  logger.info(`DOCS HTTP SERVER LISTENING ON PORT ${ENV.DOCS_PORT}`);
});
