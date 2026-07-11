import { randomUUID } from 'node:crypto';
import { NotFoundError, ValidationError } from '../../shared/errors/custom-error.js';
import type { Note, NotesRepository, NotesService, SearchNotesInput, CreateNoteInput, UpdateNoteInput } from './notes.types.js';

function normalizeSearchValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim();
  return trimmed ? trimmed.toLowerCase() : undefined;
}

function matchesSearchTerm(candidate: string, searchTerm: string): boolean {
  return candidate.toLowerCase().includes(searchTerm);
}

export class DefaultNotesService implements NotesService {
  constructor(private readonly notesRepository: NotesRepository) {}

  public async createNote(input: CreateNoteInput): Promise<Note> {
    const now = new Date();

    return this.notesRepository.create({
      id: randomUUID(),
      title: input.title,
      content: input.content,
      tags: input.tags,
      archived: false,
      pinned: false,
      favorite: false,
      createdAt: now,
      updatedAt: now,
    });
  }

  public async getNoteById(id: string): Promise<Note> {
    const note = await this.notesRepository.findById(id);
    if (!note) {
      throw new NotFoundError(`Note with id "${id}" was not found`);
    }

    return note;
  }

  public async listNotes(): Promise<Note[]> {
    return this.notesRepository.findAll();
  }

  public async updateNote(id: string, input: UpdateNoteInput): Promise<Note> {
    
    const patch = this.buildContentPatch(input);

    const updated = await this.notesRepository.update(id, patch);
    if (!updated) {
      throw new NotFoundError(`Note with id "${id}" was not found`);
    }

    return updated;
  }

  public async deleteNote(id: string): Promise<void> {
    const deleted = await this.notesRepository.delete(id);
    if (!deleted) {
      throw new NotFoundError(`Note with id "${id}" was not found`);
    }
  }

  public async archiveNote(id: string): Promise<Note> {
    return this.updateStatus(id, { archived: true });
  }

  public async restoreNote(id: string): Promise<Note> {
    return this.updateStatus(id, { archived: false });
  }

  public async pinNote(id: string): Promise<Note> {
    return this.updateStatus(id, { pinned: true });
  }

  public async unpinNote(id: string): Promise<Note> {
    return this.updateStatus(id, { pinned: false });
  }

  public async toggleFavorite(id: string): Promise<Note> {
    const note = await this.getNoteById(id);
    return this.updateStatus(id, { favorite: !note.favorite });
  }

  public async searchNotes(input: SearchNotesInput): Promise<Note[]> {
    const titleTerm = normalizeSearchValue(input.title);
    const contentTerm = normalizeSearchValue(input.content);

    if (!titleTerm && !contentTerm) {
      throw new ValidationError('At least one search term is required');
    }

    const notes = await this.notesRepository.findAll();
    return notes.filter((note) => {
      const titleMatch = titleTerm ? matchesSearchTerm(note.title, titleTerm) : true;
      const contentMatch = contentTerm ? matchesSearchTerm(note.content, contentTerm) : true;
      return titleMatch && contentMatch;
    });
  }

  private buildContentPatch(input: UpdateNoteInput): Partial<Omit<Note, 'id' | 'createdAt'>> {
    const patch: Partial<Omit<Note, 'id' | 'createdAt'>> = {
      updatedAt: new Date(),
    };

    if (input.title !== undefined) {
      patch.title = input.title;
    }

    if (input.content !== undefined) {
      patch.content = input.content;
    }

    if (input.tags !== undefined) {
      patch.tags = input.tags;
    }

    return patch;
  }

  private async updateStatus(
    id: string,
    patch: Partial<Pick<Note, 'archived' | 'pinned' | 'favorite'>>
  ): Promise<Note> {
    const updated = await this.notesRepository.update(id, {
      ...patch,
      updatedAt: new Date(),
    });

    if (!updated) {
      throw new NotFoundError(`Note with id "${id}" was not found`);
    }

    return updated;
  }
}
