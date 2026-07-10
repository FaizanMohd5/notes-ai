import type { Note } from '../types/note.types.js';

export interface NotesRepository {
  create(note: Note): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  findAll(): Promise<Note[]>;
  update(id: string, patch: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null>;
  delete(id: string): Promise<boolean>;
}
