import albumResponse from '../responses/album.js';

export default {
  '/album': {
    summary: 'Get all album',
    description: 'Get all album in the database',
    get: {
      tags: ['Album'],
      summary: 'Get all album',
      responses: albumResponse,
    },
    post: {
      tags: ['Album'],
      summary: 'create a new album',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Album',
            },
          },
        },
      },
      responses: albumResponse,
    },
    put: {
      tags: ['Album'],
    },
  },
  '/album/{id}': {
    summary: 'Get one album with given id',
    description: 'Get one album with given id',
    get: {
      tags: ['Album'],
      summary: 'Get one album with given id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the album to get',
        },
      ],
      responses: albumResponse,
    },
    delete: {
      tags: ['Album'],
      summary: 'Delete a album with id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the album to delete',
        },
      ],
    },
  },
};
