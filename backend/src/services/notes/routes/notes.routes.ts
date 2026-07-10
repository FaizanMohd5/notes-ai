import { Router } from 'express';
import { NotesController } from '../controller/notes.controller.js';

export function createNotesRouter(notesController: NotesController): Router {
  const router = Router();

  router.get('/', notesController.listNotes);
  router.get('/search', notesController.searchNotes);
  router.post('/', notesController.createNote);
  router.get('/:id', notesController.getNoteById);
  router.patch('/:id', notesController.updateNote);
  router.delete('/:id', notesController.deleteNote);
  router.patch('/:id/archive', notesController.archiveNote);
  router.patch('/:id/restore', notesController.restoreNote);
  router.patch('/:id/pin', notesController.pinNote);
  router.patch('/:id/unpin', notesController.unpinNote);
  router.patch('/:id/favorite/toggle', notesController.toggleFavorite);

  return router;
}
