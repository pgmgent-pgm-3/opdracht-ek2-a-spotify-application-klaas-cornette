import artistResponse from '../responses/artist.js';

export default {
  '/artist': {
    summary: 'Get all artist',
    description: 'Get all artist in the database',
    get: {
      tags: ['Artist'],
      summary: 'Get all artist',
      responses: artistResponse,
    },
    post: {
      tags: ['Artist'],
      summary: 'create a new artist',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Artist',
            },
          },
        },
      },
      responses: artistResponse,
    },
    put: {
      tags: ['Artist'],
    },
  },
  '/artist/{id}': {
    summary: 'Get one artist with given id',
    description: 'Get one artist with given id',
    get: {
      tags: ['Artist'],
      summary: 'Get one artist with given id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the artist to get',
        },
      ],
      responses: artistResponse,
    },
    delete: {
      tags: ['Artist'],
      summary: 'Delete a artist with id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the artist to delete',
        },
      ],
    },
  },
};
