import type { Express } from 'express';
import express from 'express';
import { loggerMiddleware } from '../shared/middleware/logger.middleware.js';

export function setupMiddleware(app: Express): void {
  app.use(express.json({ limit: '1mb' }));
  app.use(loggerMiddleware);
}
