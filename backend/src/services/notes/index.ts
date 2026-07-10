import { NotesController } from './controller/notes.controller.js';
import { InMemoryNotesRepository } from './repository/notes.repository.js';
import { createNotesRouter } from './routes/notes.routes.js';
import { DefaultNotesService } from './service/notes.service.js';

export function buildNotesRouter() {
  const repository = new InMemoryNotesRepository();
  const service = new DefaultNotesService(repository);
  const controller = new NotesController(service);

  return createNotesRouter(controller);
}

export { createNotesRouter } from './routes/index.js';
