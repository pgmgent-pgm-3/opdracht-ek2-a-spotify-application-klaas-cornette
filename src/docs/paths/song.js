import songResponse from '../responses/song.js';

export default {
  '/song': {
    summary: 'Get all song',
    description: 'Get all song in the database',
    get: {
      tags: ['Song'],
      summary: 'Get all song',
      responses: songResponse,
    },
    post: {
      tags: ['Song'],
      summary: 'create a new song',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Song',
            },
          },
        },
      },
      responses: songResponse,
    },
    put: {
      tags: ['Song'],
    },
  },
  '/song/{id}': {
    summary: 'Get one song with given id',
    description: 'Get one song with given id',
    get: {
      tags: ['Song'],
      summary: 'Get one song with given id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the song to get',
        },
      ],
      responses: songResponse,
    },
    delete: {
      tags: ['Song'],
      summary: 'Delete a song with id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the song to delete',
        },
      ],
    },
  },
};
