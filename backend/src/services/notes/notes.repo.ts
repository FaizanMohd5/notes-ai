import type { Note, NotesRepository } from './notes.types.js';

function cloneNote(note: Note): Note {
  return {
    ...note,
    tags: [...note.tags],
    createdAt: new Date(note.createdAt),
    updatedAt: new Date(note.updatedAt),
  };
}

function sortByUpdatedAtDesc(left: Note, right: Note): number {
  return right.updatedAt.getTime() - left.updatedAt.getTime();
}

export class InMemoryNotesRepository implements NotesRepository {
  private readonly notes = new Map<string, Note>();

  public async create(note: Note): Promise<Note> {
    const stored = cloneNote(note);
    this.notes.set(stored.id, stored);
    return cloneNote(stored);
  }

  public async findById(id: string): Promise<Note | null> {
    const note = this.notes.get(id);
    return note ? cloneNote(note) : null;
  }

  public async findAll(): Promise<Note[]> {
    return [...this.notes.values()].map(cloneNote).sort(sortByUpdatedAtDesc);
  }

  public async update(id: string, patch: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null> {
    const current = this.notes.get(id);
    if (!current) {
      return null;
    }

    const updated: Note = {
      ...current,
      ...patch,
      tags: patch.tags !== undefined ? [...patch.tags] : [...current.tags],
      updatedAt: patch.updatedAt ? new Date(patch.updatedAt) : new Date(),
      createdAt: new Date(current.createdAt),
    };

    this.notes.set(id, updated);
    return cloneNote(updated);
  }

  public async delete(id: string): Promise<boolean> {
    return this.notes.delete(id);
  }
}
