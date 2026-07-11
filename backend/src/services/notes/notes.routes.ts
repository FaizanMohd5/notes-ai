import { Router } from 'express';
import { NotesController } from './notes.controller.js';

/**
 * @openapi
 * /notes:
 *   get:
 *     tags:
 *       - Notes
 *     summary: List notes
 *     responses:
 *       "200":
 *         description: List of notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
/**
 * @openapi
 * /notes/search:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Search notes by title and content
 *     parameters:
 *       - name: title
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *       - name: content
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       "200":
 *         description: Matching notes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */
/**
 * @openapi
 * /notes:
 *   post:
 *     tags:
 *       - Notes
 *     summary: Create note
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateNoteRequest'
 *     responses:
 *       "201":
 *         description: Created note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 */
/**
 * @openapi
 * /notes/{id}:
 *   get:
 *     tags:
 *       - Notes
 *     summary: Get note by id
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       "200":
 *         description: Note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @openapi
 * /notes/{id}:
 *   patch:
 *     tags:
 *       - Notes
 *     summary: Update note
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateNoteRequest'
 *     responses:
 *       "200":
 *         description: Updated note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @openapi
 * /notes/{id}:
 *   delete:
 *     tags:
 *       - Notes
 *     summary: Delete note
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       "204":
 *         description: Note deleted
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @openapi
 * /notes/{id}/archive:
 *   patch:
 *     tags:
 *       - Notes
 *     summary: Archive note
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       "200":
 *         description: Archived note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @openapi
 * /notes/{id}/restore:
 *   patch:
 *     tags:
 *       - Notes
 *     summary: Restore note
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       "200":
 *         description: Restored note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @openapi
 * /notes/{id}/pin:
 *   patch:
 *     tags:
 *       - Notes
 *     summary: Pin note
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       "200":
 *         description: Pinned note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @openapi
 * /notes/{id}/unpin:
 *   patch:
 *     tags:
 *       - Notes
 *     summary: Unpin note
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       "200":
 *         description: Unpinned note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
/**
 * @openapi
 * /notes/{id}/favorite/toggle:
 *   patch:
 *     tags:
 *       - Notes
 *     summary: Toggle note favorite state
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       "200":
 *         description: Toggled favorite note
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
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
