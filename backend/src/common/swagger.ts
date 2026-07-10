export function createOpenApiSpec() {
  return {
    openapi: '3.0.3',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'In-memory Notes service with REST endpoints for CRUD and note actions.',
    },
    servers: [{ url: '/' }],
    tags: [{ name: 'Notes', description: 'Operations for managing notes' }],
    paths: {
      '/notes': {
        get: {
          tags: ['Notes'],
          summary: 'List notes',
          responses: {
            200: {
              description: 'List of notes',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Note' },
                  },
                },
              },
            },
          },
        },
        post: {
          tags: ['Notes'],
          summary: 'Create note',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/CreateNoteRequest' },
              },
            },
          },
          responses: {
            201: {
              description: 'Created note',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Note' },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
          },
        },
      },
      '/notes/search': {
        get: {
          tags: ['Notes'],
          summary: 'Search notes by title and content',
          parameters: [
            {
              name: 'title',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Search term for note titles',
            },
            {
              name: 'content',
              in: 'query',
              required: false,
              schema: { type: 'string' },
              description: 'Search term for note contents',
            },
          ],
          responses: {
            200: {
              description: 'Matching notes',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/Note' },
                  },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
          },
        },
      },
      '/notes/{id}': {
        get: {
          tags: ['Notes'],
          summary: 'Get note by id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Note',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Note' },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
        patch: {
          tags: ['Notes'],
          summary: 'Update note',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/UpdateNoteRequest' },
              },
            },
          },
          responses: {
            200: {
              description: 'Updated note',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Note' },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
        delete: {
          tags: ['Notes'],
          summary: 'Delete note',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            204: { description: 'Note deleted' },
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
      },
      '/notes/{id}/archive': {
        patch: {
          tags: ['Notes'],
          summary: 'Archive note',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Archived note',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Note' },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
      },
      '/notes/{id}/restore': {
        patch: {
          tags: ['Notes'],
          summary: 'Restore note',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Restored note',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Note' },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
      },
      '/notes/{id}/pin': {
        patch: {
          tags: ['Notes'],
          summary: 'Pin note',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Pinned note',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Note' },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
      },
      '/notes/{id}/unpin': {
        patch: {
          tags: ['Notes'],
          summary: 'Unpin note',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Unpinned note',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Note' },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
      },
      '/notes/{id}/favorite/toggle': {
        patch: {
          tags: ['Notes'],
          summary: 'Toggle note favorite state',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: { type: 'string', format: 'uuid' },
            },
          ],
          responses: {
            200: {
              description: 'Toggled favorite note',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Note' },
                },
              },
            },
            400: { $ref: '#/components/responses/BadRequest' },
            404: { $ref: '#/components/responses/NotFound' },
          },
        },
      },
    },
    components: {
      responses: {
        BadRequest: {
          description: 'Bad request',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
        NotFound: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: { $ref: '#/components/schemas/ErrorResponse' },
            },
          },
        },
      },
      schemas: {
        Note: {
          type: 'object',
          required: ['id', 'title', 'content', 'tags', 'archived', 'pinned', 'favorite', 'createdAt', 'updatedAt'],
          properties: {
            id: { type: 'string', format: 'uuid' },
            title: { type: 'string' },
            content: { type: 'string' },
            tags: {
              type: 'array',
              items: { type: 'string' },
            },
            archived: { type: 'boolean' },
            pinned: { type: 'boolean' },
            favorite: { type: 'boolean' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        CreateNoteRequest: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', minLength: 1, maxLength: 200 },
            content: { type: 'string', maxLength: 50000 },
            tags: {
              type: 'array',
              items: { type: 'string', minLength: 1, maxLength: 50 },
            },
          },
        },
        UpdateNoteRequest: {
          type: 'object',
          minProperties: 1,
          properties: {
            title: { type: 'string', minLength: 1, maxLength: 200 },
            content: { type: 'string', maxLength: 50000 },
            tags: {
              type: 'array',
              items: { type: 'string', minLength: 1, maxLength: 50 },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          required: ['message', 'code'],
          properties: {
            message: { type: 'string' },
            code: { type: 'string' },
            details: {
              type: 'array',
              items: { type: 'string' },
            },
          },
        },
      },
    },
  };
}

export function createSwaggerUiHtml(openApiUrl: string): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Notes API Docs</title>
    <link rel="stylesheet" href="https://unpkg.com/swagger-ui-dist@5/swagger-ui.css" />
    <style>
      body { margin: 0; background: #0f172a; }
      #swagger-ui { background: white; min-height: 100vh; }
    </style>
  </head>
  <body>
    <div id="swagger-ui"></div>
    <script src="https://unpkg.com/swagger-ui-dist@5/swagger-ui-bundle.js"></script>
    <script>
      window.onload = function () {
        window.ui = SwaggerUIBundle({
          url: ${JSON.stringify(openApiUrl)},
          dom_id: '#swagger-ui',
          deepLinking: true,
          presets: [SwaggerUIBundle.presets.apis],
          layout: 'BaseLayout'
        });
      };
    </script>
  </body>
</html>`;
}
