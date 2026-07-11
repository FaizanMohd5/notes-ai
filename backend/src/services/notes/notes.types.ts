export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  archived: boolean;
  pinned: boolean;
  favorite: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateNoteInput {
  title: string;
  content: string;
  tags: string[];
}

export interface UpdateNoteInput {
  title?: string;
  content?: string;
  tags?: string[];
}

export interface SearchNotesInput {
  title?: string;
  content?: string;
}

export interface NoteResponse {
  id: string;
  title: string;
  content: string;
  tags: string[];
  archived: boolean;
  pinned: boolean;
  favorite: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface NotesRepository {
  create(note: Note): Promise<Note>;
  findById(id: string): Promise<Note | null>;
  findAll(): Promise<Note[]>;
  update(id: string, patch: Partial<Omit<Note, 'id' | 'createdAt'>>): Promise<Note | null>;
  delete(id: string): Promise<boolean>;
}

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
