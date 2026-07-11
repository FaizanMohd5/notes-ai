import type { RequestHandler } from 'express';
import { UnauthorizedError } from '../errors/custom-error.js';

export function createAuthMiddleware(expectedToken = process.env.AUTH_TOKEN): RequestHandler {
  return (req, _res, next) => {
    if (!expectedToken) {
      next();
      return;
    }

    const authHeader = req.header('authorization');
    if (authHeader !== `Bearer ${expectedToken}`) {
      next(new UnauthorizedError());
      return;
    }

    next();
  };
}
