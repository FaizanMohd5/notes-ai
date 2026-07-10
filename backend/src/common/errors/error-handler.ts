import type { ErrorRequestHandler, RequestHandler } from 'express';
import { AppError, ValidationError } from './app-error.js';

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({
    message: 'Route not found',
    code: 'NOT_FOUND',
  });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof SyntaxError && 'status' in error && error.status === 400) {
    res.status(400).json({
      message: 'Invalid JSON payload',
      code: 'INVALID_JSON',
    });
    return;
  }

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      code: error.code,
      details: error.details,
    });
    return;
  }

  if (error instanceof Error) {
    res.status(500).json({
      message: 'Internal server error',
      code: 'INTERNAL_SERVER_ERROR',
    });
    return;
  }

  res.status(500).json({
    message: 'Internal server error',
    code: 'INTERNAL_SERVER_ERROR',
  });
};

export { AppError, ValidationError };
