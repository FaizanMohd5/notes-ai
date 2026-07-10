import type {
  CreateNoteInput,
  Note,
  SearchNotesInput,
  UpdateNoteInput,
} from '../types/note.types.js';

export interface NotesService {
  createNote(input: CreateNoteInput): Promise<Note>;
  getNoteById(id: string): Promise<Note>;
  listNotes(): Promise<Note[]>;
  updateNote(id: string, input: UpdateNoteInput): Promise<Note>;
  deleteNote(id: string): Promise<void>;
  archiveNote(id: string): Promise<Note>;
  restoreNote(id: string): Promise<Note>;
  pinNote(id: string): Promise<Note>;
  unpinNote(id: string): Promise<Note>;
  toggleFavorite(id: string): Promise<Note>;
  searchNotes(input: SearchNotesInput): Promise<Note[]>;
}
