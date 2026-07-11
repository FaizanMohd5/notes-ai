import { z } from 'zod';
import { ValidationError } from '../../shared/errors/custom-error.js';
import type { CreateNoteInput, SearchNotesInput, UpdateNoteInput } from './notes.types.js';

const noteIdSchema = z.string().uuid({ message: 'Invalid note id' });

const noteTagSchema = z.string().trim().min(1, '"tags" items cannot be empty').max(50, '"tags" items cannot exceed 50 characters');

const createNoteSchema = z.object({
  title: z.string().trim().min(1, '"title" cannot be empty').max(200, '"title" cannot exceed 200 characters'),
  content: z.string().trim().max(50_000, '"content" cannot exceed 50000 characters').default(''),
  tags: z
    .array(noteTagSchema, { invalid_type_error: '"tags" must be an array of strings' })
    .max(20, '"tags" cannot contain more than 20 items')
    .default([])
    .transform((tags) => [...new Set(tags)]),
});

const updateNoteSchema = z
  .object({
    title: z.string().trim().min(1, '"title" cannot be empty').max(200, '"title" cannot exceed 200 characters').optional(),
    content: z.string().trim().max(50_000, '"content" cannot exceed 50000 characters').optional(),
    tags: z
      .array(noteTagSchema, { invalid_type_error: '"tags" must be an array of strings' })
      .max(20, '"tags" cannot contain more than 20 items')
      .transform((tags) => [...new Set(tags)])
      .optional(),
  })
  .strict()
  .refine((value) => value.title !== undefined || value.content !== undefined || value.tags !== undefined, {
    message: 'At least one update field must be provided',
  });

const searchNotesSchema = z
  .object({
    title: z.string().trim().min(1).optional(),
    content: z.string().trim().min(1).optional(),
  })
  .strict()
  .refine((value) => value.title !== undefined || value.content !== undefined, {
    message: 'At least one search parameter is required',
  });

function formatZodIssues(issues: z.ZodIssue[]): string[] {
  return issues.map((issue) => {
    const path = issue.path.length > 0 ? `${issue.path.join('.')}: ` : '';
    return `${path}${issue.message}`;
  });
}

function parseWithValidation<T>(schema: z.ZodType<T>, input: unknown, fallbackMessage: string): T {
  const parsed = schema.safeParse(input);
  if (parsed.success) {
    return parsed.data;
  }

  throw new ValidationError(fallbackMessage, formatZodIssues(parsed.error.issues));
}

export function validateNoteId(id: unknown): string {
  return parseWithValidation(noteIdSchema, id, 'Invalid note id');
}

export function validateCreateNoteInput(body: unknown): CreateNoteInput {
  const parsed = parseWithValidation(createNoteSchema, body, 'Request validation failed');
  return {
    title: parsed.title,
    content: parsed.content ?? '',
    tags: parsed.tags ?? [],
  };
}

export function validateUpdateNoteInput(body: unknown): UpdateNoteInput {
  const parsed = parseWithValidation(updateNoteSchema, body, 'Request validation failed');
  const update: UpdateNoteInput = {};

  if (parsed.title !== undefined) {
    update.title = parsed.title;
  }

  if (parsed.content !== undefined) {
    update.content = parsed.content;
  }

  if (parsed.tags !== undefined) {
    update.tags = parsed.tags;
  }

  return update;
}

export function validateSearchInput(query: unknown): SearchNotesInput {
  const parsed = parseWithValidation(searchNotesSchema, query, 'Request validation failed');
  const search: SearchNotesInput = {};

  if (parsed.title !== undefined) {
    search.title = parsed.title;
  }

  if (parsed.content !== undefined) {
    search.content = parsed.content;
  }

  return search;
}
