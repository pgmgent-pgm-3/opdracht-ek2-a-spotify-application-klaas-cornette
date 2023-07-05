import usermetaResponse from '../responses/usermeta.js';

export default {
  '/usermeta': {
    summary: 'Get all usermeta',
    description: 'Get all usermeta in the database',
    get: {
      tags: ['UserMeta'],
      summary: 'Get all usermeta',
      responses: usermetaResponse,
    },
    post: {
      tags: ['UserMeta'],
      summary: 'create a new usermeta',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserMeta',
            },
          },
        },
      },
      responses: usermetaResponse,
    },
    put: {
      tags: ['Usermeta'],
    },
  },
  '/usermeta/{id}': {
    summary: 'Get one usermeta with given id',
    description: 'Get one usermeta with given id',
    get: {
      tags: ['UserMeta'],
      summary: 'Get one usermeta with given id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the usermeta to get',
        },
      ],
      responses: usermetaResponse,
    },
    delete: {
      tags: ['UserMeta'],
      summary: 'Delete a usermeta with id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the usermeta to delete',
        },
      ],
    },
  },
};
