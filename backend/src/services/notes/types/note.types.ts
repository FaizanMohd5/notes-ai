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

export interface ErrorResponse {
  message: string;
  code: string;
  details?: string[];
}
