import { NotesController } from './notes.controller.js';
import { InMemoryNotesRepository } from './notes.repo.js';
import { createNotesRouter } from './notes.routes.js';
import { DefaultNotesService } from './notes.service.js';

export function buildNotesRouter() {
  const repository = new InMemoryNotesRepository();
  const service = new DefaultNotesService(repository);
  const controller = new NotesController(service);

  return createNotesRouter(controller);
}

export { createNotesRouter } from './notes.routes.js';
