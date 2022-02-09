import * as compression from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import helmet from 'helmet';

import { env } from '@config/env';
import { successLogger, errorLogger } from '@config/morgan';

import { errorConverter, errorHandler } from '@middlewares/error';

import { ApiError } from '@utils/api-error';

import routerV1 from '@routes/v1';

const app = express();

/* istanbul ignore next */
if (env !== 'test') {
  app.use(successLogger);
  app.use(errorLogger);
}

// Middlewares
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
// TODO: use strict cors policy? 🤔
app.use(cors());
// TODO: Cookie middleware

// TODO: api rate limiter? 🤔
// if (env === 'production') {
// }

// Routes
app.use('/v1', routerV1);

// 404 Not Found
app.all('*', (_req, _res, next) => {
  next(new ApiError('NotFound'));
});

// Convert error to ApiError, if needed.
app.use(errorConverter);

// Error Handler
app.use(errorHandler);

export default app;
