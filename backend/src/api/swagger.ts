import type { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import type { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Notes API',
      version: '1.0.0',
      description: 'In-memory Notes service with REST endpoints for CRUD and note actions.',
    },
    servers: [{ url: '/' }],
    components: {
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
    },
  },
  apis: ['src/services/**/*.routes.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

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

export function setupSwagger(app: Express): void {
  app.get('/api-docs.json', (_req, res) => {
    res.status(200).json(swaggerSpec);
  });

  app.get('/api-docs', (_req, res) => {
    res.type('html').send(createSwaggerUiHtml('/api-docs.json'));
  });
}
