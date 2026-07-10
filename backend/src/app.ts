import express from 'express';
import { errorHandler, notFoundHandler } from './common/errors/error-handler.js';
import { createOpenApiSpec, createSwaggerUiHtml } from './common/swagger.js';
import { buildNotesRouter } from './services/notes/index.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(express.json({ limit: '1mb' }));

  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.get('/openapi.json', (_req, res) => {
    res.status(200).json(createOpenApiSpec());
  });

  app.get('/docs', (_req, res) => {
    res.type('html').send(createSwaggerUiHtml('/openapi.json'));
  });

  app.use('/notes', buildNotesRouter());

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
