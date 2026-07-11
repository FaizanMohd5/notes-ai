import type { RequestHandler } from 'express';
import { TooManyRequestsError } from '../errors/custom-error.js';

export interface RateLimitOptions {
  windowMs?: number;
  maxRequests?: number;
}

export function createRateLimitMiddleware(options: RateLimitOptions = {}): RequestHandler {
  const windowMs = options.windowMs ?? 60_000;
  const maxRequests = options.maxRequests ?? 120;
  const counters = new Map<string, { count: number; expiresAt: number }>();

  return (req, _res, next) => {
    const key = req.ip ?? req.socket.remoteAddress ?? 'unknown';
    const now = Date.now();
    const current = counters.get(key);

    if (!current || current.expiresAt <= now) {
      counters.set(key, { count: 1, expiresAt: now + windowMs });
      next();
      return;
    }

    if (current.count >= maxRequests) {
      next(new TooManyRequestsError());
      return;
    }

    current.count += 1;
    next();
  };
}
