import type { NextFunction, Request, Response } from 'express';
import { ValidationError } from '../../../common/errors/app-error.js';
import { validateCreateNoteInput, validateNoteId, validateSearchInput, validateUpdateNoteInput } from '../validation/notes.validation.js';
import type { NotesService } from '../service/notes.service.interface.js';
import type { NoteResponse } from '../types/note.types.js';

function toNoteResponse(note: import('../types/note.types.js').Note): NoteResponse {
  return {
    id: note.id,
    title: note.title,
    content: note.content,
    tags: [...note.tags],
    archived: note.archived,
    pinned: note.pinned,
    favorite: note.favorite,
    createdAt: note.createdAt.toISOString(),
    updatedAt: note.updatedAt.toISOString(),
  };
}

function getParamValue(value: string | string[] | undefined): string {
  if (Array.isArray(value) || typeof value !== 'string') {
    throw new ValidationError('Invalid note id');
  }

  return value;
}

export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  public createNote = async (req: Request, res: Response, _next: NextFunction): Promise<void> => {
    const input = validateCreateNoteInput(req.body);
    const note = await this.notesService.createNote(input);

    res.status(201).location(`/notes/${note.id}`).json(toNoteResponse(note));
  };

  public getNoteById = async (req: Request, res: Response): Promise<void> => {
    const id = validateNoteId(getParamValue(req.params.id));
    const note = await this.notesService.getNoteById(id);

    res.status(200).json(toNoteResponse(note));
  };

  public listNotes = async (_req: Request, res: Response): Promise<void> => {
    const notes = await this.notesService.listNotes();
    res.status(200).json(notes.map(toNoteResponse));
  };

  public updateNote = async (req: Request, res: Response): Promise<void> => {
    const id = validateNoteId(getParamValue(req.params.id));
    const input = validateUpdateNoteInput(req.body);
    const note = await this.notesService.updateNote(id, input);

    res.status(200).json(toNoteResponse(note));
  };

  public deleteNote = async (req: Request, res: Response): Promise<void> => {
    const id = validateNoteId(getParamValue(req.params.id));
    await this.notesService.deleteNote(id);
    res.status(204).send();
  };

  public archiveNote = async (req: Request, res: Response): Promise<void> => {
    const id = validateNoteId(getParamValue(req.params.id));
    const note = await this.notesService.archiveNote(id);
    res.status(200).json(toNoteResponse(note));
  };

  public restoreNote = async (req: Request, res: Response): Promise<void> => {
    const id = validateNoteId(getParamValue(req.params.id));
    const note = await this.notesService.restoreNote(id);
    res.status(200).json(toNoteResponse(note));
  };

  public pinNote = async (req: Request, res: Response): Promise<void> => {
    const id = validateNoteId(getParamValue(req.params.id));
    const note = await this.notesService.pinNote(id);
    res.status(200).json(toNoteResponse(note));
  };

  public unpinNote = async (req: Request, res: Response): Promise<void> => {
    const id = validateNoteId(getParamValue(req.params.id));
    const note = await this.notesService.unpinNote(id);
    res.status(200).json(toNoteResponse(note));
  };

  public toggleFavorite = async (req: Request, res: Response): Promise<void> => {
    const id = validateNoteId(getParamValue(req.params.id));
    const note = await this.notesService.toggleFavorite(id);
    res.status(200).json(toNoteResponse(note));
  };

  public searchNotes = async (req: Request, res: Response): Promise<void> => {
    const input = validateSearchInput(req.query);
    const notes = await this.notesService.searchNotes(input);

    res.status(200).json(notes.map(toNoteResponse));
  };
}

export { toNoteResponse };
