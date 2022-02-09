import Joi = require('joi');

import { env } from '@config/env';
import { logger } from '@config/logger';

import { ApiError } from '@utils/api-error';

import type { NextFunction, Request, Response } from 'express';

export const errorConverter = (err: any, _req: Request, _res: Response, next: NextFunction) => {
  if (err instanceof ApiError) {
    next(err);
  } else if (Joi.isError(err)) {
    next(new ApiError('ValidationError', err.message, undefined, err.stack));
  } else if (err instanceof Error) {
    next(new ApiError('InternalServerError', undefined, undefined, err.stack));
  } else {
    next(new ApiError('InternalServerError'));
  }
};

export const errorHandler = (err: ApiError, _req: Request, res: Response, _next: NextFunction) => {
  res.locals.errorMessage = err.message;

  /* istanbul ignore next */
  if (env === 'development') {
    logger.error(err);
  } else if (env === 'production') {
    // TODO: logger for production? 🤔
  }

  res.status(err.statusCode).json(err.toJson(env === 'development'));
};
