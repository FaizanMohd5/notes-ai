import express from 'express';
import { setupErrorHandling } from './api/error-handler.js';
import { setupMiddleware } from './api/middleware.js';
import { setupRoutes } from './api/routes.js';
import { setupSwagger } from './api/swagger.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  setupMiddleware(app);
  setupRoutes(app);
  setupSwagger(app);
  setupErrorHandling(app);

  return app;
}
