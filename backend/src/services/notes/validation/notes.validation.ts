import { ValidationError } from '../../../common/errors/app-error.js';
import type { CreateNoteInput, SearchNotesInput, UpdateNoteInput } from '../types/note.types.js';

const NOTE_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const MAX_TITLE_LENGTH = 200;
const MAX_CONTENT_LENGTH = 50_000;
const MAX_TAG_LENGTH = 50;
const MAX_TAG_COUNT = 20;

type JsonRecord = Record<string, unknown>;

function isRecord(value: unknown): value is JsonRecord {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function trimString(value: unknown, fieldName: string, required: boolean): string | undefined {
  if (value === undefined) {
    if (required) {
      throw new ValidationError(`"${fieldName}" is required`);
    }

    return undefined;
  }

  if (typeof value !== 'string') {
    throw new ValidationError(`"${fieldName}" must be a string`);
  }

  const trimmed = value.trim();
  if (required && !trimmed) {
    throw new ValidationError(`"${fieldName}" cannot be empty`);
  }

  return trimmed;
}

function parseOptionalTags(value: unknown): string[] | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new ValidationError('"tags" must be an array of strings');
  }

  if (value.length > MAX_TAG_COUNT) {
    throw new ValidationError(`"tags" cannot contain more than ${MAX_TAG_COUNT} items`);
  }

  const tags = value.map((item, index) => {
    if (typeof item !== 'string') {
      throw new ValidationError(`"tags[${index}]" must be a string`);
    }

    const tag = item.trim();
    if (!tag) {
      throw new ValidationError(`"tags[${index}]" cannot be empty`);
    }

    if (tag.length > MAX_TAG_LENGTH) {
      throw new ValidationError(`"tags[${index}]" cannot exceed ${MAX_TAG_LENGTH} characters`);
    }

    return tag;
  });

  return [...new Set(tags)];
}

function ensureIdFormat(id: string): string {
  if (!NOTE_ID_PATTERN.test(id)) {
    throw new ValidationError('Invalid note id');
  }

  return id;
}

export function validateNoteId(id: string): string {
  return ensureIdFormat(id);
}

export function validateCreateNoteInput(body: unknown): CreateNoteInput {
  if (!isRecord(body)) {
    throw new ValidationError('Request body must be a JSON object');
  }

  const title = trimString(body.title, 'title', true);
  if (title === undefined) {
    throw new ValidationError('"title" is required');
  }

  const contentValue = body.content === undefined ? '' : trimString(body.content, 'content', false);
  const content = contentValue ?? '';
  const tags = parseOptionalTags(body.tags) ?? [];

  if (title.length > MAX_TITLE_LENGTH) {
    throw new ValidationError(`"title" cannot exceed ${MAX_TITLE_LENGTH} characters`);
  }

  if (content.length > MAX_CONTENT_LENGTH) {
    throw new ValidationError(`"content" cannot exceed ${MAX_CONTENT_LENGTH} characters`);
  }

  return { title, content, tags };
}

export function validateUpdateNoteInput(body: unknown): UpdateNoteInput {
  if (!isRecord(body)) {
    throw new ValidationError('Request body must be a JSON object');
  }

  const hasTitle = Object.prototype.hasOwnProperty.call(body, 'title');
  const hasContent = Object.prototype.hasOwnProperty.call(body, 'content');
  const hasTags = Object.prototype.hasOwnProperty.call(body, 'tags');

  if (!hasTitle && !hasContent && !hasTags) {
    throw new ValidationError('At least one update field must be provided');
  }

  const update: UpdateNoteInput = {};

  if (hasTitle) {
    const title = trimString(body.title, 'title', true);
    if (title === undefined) {
      throw new ValidationError('"title" is required');
    }

    if (title.length > MAX_TITLE_LENGTH) {
      throw new ValidationError(`"title" cannot exceed ${MAX_TITLE_LENGTH} characters`);
    }

    update.title = title;
  }

  if (hasContent) {
    const contentValue = body.content === undefined ? '' : trimString(body.content, 'content', false);
    const content = contentValue ?? '';
    if (content.length > MAX_CONTENT_LENGTH) {
      throw new ValidationError(`"content" cannot exceed ${MAX_CONTENT_LENGTH} characters`);
    }

    update.content = content;
  }

  if (hasTags) {
    update.tags = parseOptionalTags(body.tags) ?? [];
  }

  return update;
}

export function validateSearchInput(query: unknown): SearchNotesInput {
  if (!isRecord(query)) {
    throw new ValidationError('Query string must be an object');
  }

  const title = trimString(query.title, 'title', false);
  const content = trimString(query.content, 'content', false);

  if (!title && !content) {
    throw new ValidationError('At least one search parameter is required');
  }

  const search: SearchNotesInput = {};
  if (title !== undefined) {
    search.title = title;
  }

  if (content !== undefined) {
    search.content = content;
  }

  return search;
}
