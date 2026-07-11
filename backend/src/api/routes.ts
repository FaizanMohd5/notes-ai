import type { Express } from 'express';
import { buildNotesRouter } from '../services/notes/index.js';

export function setupRoutes(app: Express): void {
  app.get('/health', (_req, res) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/notes', buildNotesRouter());
}
