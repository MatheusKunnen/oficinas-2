import express from 'express';
import ErrorResponse from '../error/ErrorResponse';

const errorHandler =
  () =>
  (err: any, req: express.Request, res: express.Response, next: Function) => {
    console.log(err);
    if (typeof err.httpCode === 'number') {
      const error: ErrorResponse = err;
      return res.status(error.getHttpCode()).json({
        error: {
          name: error.getName(),
          message: error.getMessage(),
          cod: error.getErrorCode(),
        },
      });
    }
    return res.status(500).json({
      error: {
        name: 'Internal server error.',
        message: 'An unexpected has ocurred. :(',
        cod: '500',
      },
    });
  };
export default errorHandler;
