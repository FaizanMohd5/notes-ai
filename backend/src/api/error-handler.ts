import type { Express } from 'express';
import { errorHandlerMiddleware, notFoundMiddleware } from '../shared/middleware/error-handler.middleware.js';

export function setupErrorHandling(app: Express): void {
  app.use(notFoundMiddleware);
  app.use(errorHandlerMiddleware);
}
