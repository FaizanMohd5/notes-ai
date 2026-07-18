import { describe, expect, it, vi, beforeEach, type Mocked } from "vitest";

import { DefaultNotesService } from "../../../src/services/notes/notes.service.js";
import type { NotesRepository } from "../../../src/services/notes/notes.types.js";

let repository: Mocked<NotesRepository>;
let service: DefaultNotesService;

beforeEach(() => {
    repository = {
        create: vi.fn(),
        findById: vi.fn(),
        findAll: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    };

    service = new DefaultNotesService(repository);
});

describe('DefaultNotesService', () => {
    it('should create a note', async () => {
        // Arrange
        const input = {
            title: "Shopping",
            content: "Buy milk",
            tags: ["personal"],
        };

        const createdNote = {
            id: "abc-123",
            title: "Shopping",
            content: "Buy milk",
            tags: ["personal"],
            archived: false,
            pinned: false,
            favorite: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        repository.create.mockResolvedValue(createdNote);

        // Act
        const result = await service.createNote(createdNote);

        // Assert
        expect(result).toEqual(createdNote);
        expect(repository.create).toHaveBeenCalledTimes(1);
    });
});

