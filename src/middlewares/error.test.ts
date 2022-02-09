import Joi = require('joi');

import { ApiError } from '@utils/api-error';

import { errorConverter } from './error';

import type { Request, Response } from 'express';

describe('error middlewares', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = { json: jest.fn() };
  });

  it('errorConverter - ApiError', () => {
    const nextFunction = jest.fn();

    errorConverter(
      new ApiError('ValidationError'),
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(ApiError);
  });

  it('errorConverter - JoiError', () => {
    const nextFunction = jest.fn();
    let error: any;

    try {
      Joi.assert(0, Joi.valid(1));
    } catch (err) {
      error = err;
    }

    errorConverter(error, mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(ApiError);
  });

  it('errorConverter - Error', () => {
    const nextFunction = jest.fn();

    errorConverter(
      new Error('Custom Error'),
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(ApiError);
  });

  it('errorConverter - any', () => {
    const nextFunction = jest.fn();

    errorConverter('foo', mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toBeCalledTimes(1);
    expect(nextFunction.mock.calls[0][0]).toBeInstanceOf(ApiError);
  });
});
