import { StatusCodes } from 'http-status-codes';

// Define defaults
export const ERRORS = {
  // Common Errors
  InternalServerError: {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: 'Unhandled error occured.',
  },
  NotFound: {
    statusCode: StatusCodes.NOT_FOUND,
    message: 'Not found.',
  },
  MethodNotAllowed: {
    statusCode: StatusCodes.METHOD_NOT_ALLOWED,
    message: 'Method is not allowed.',
  },
  ValidationError: {
    statusCode: StatusCodes.BAD_REQUEST,
    message: 'Invalid data in query string or request body. Please check your request.',
  },
} as const;

type ErrorName = keyof typeof ERRORS;

/* istanbul ignore next */
export class ApiError extends Error {
  name: ErrorName;
  message: string;
  statusCode: StatusCodes;

  constructor(name: ErrorName, message?: string, statusCode?: StatusCodes, stack?: string) {
    super(message);

    this.name = name;
    this.message = message || ERRORS[name].message;
    this.statusCode = statusCode || ERRORS[name].statusCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  toJson(withDetails = false): ApiErrorJson {
    return withDetails
      ? {
          name: this.name,
          message: this.message,
          stack: this.stack,
        }
      : {
          name: this.name,
        };
  }
}

export type ApiErrorJson = Pick<ApiError, 'name'> & { message?: string; stack?: string };
