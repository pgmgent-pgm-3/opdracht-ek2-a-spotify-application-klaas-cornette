import userResponse from '../responses/user.js';

export default {
  '/user': {
    summary: 'Get all user',
    description: 'Get all user in the database',
    get: {
      tags: ['User'],
      summary: 'Get all user',
      responses: userResponse,
    },
    post: {
      tags: ['User'],
      summary: 'create a new user',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User',
            },
          },
        },
      },
      responses: userResponse,
    },
    put: {
      tags: ['User'],
    },
  },
  '/user/{id}': {
    summary: 'Get one user with given id',
    description: 'Get one user with given id',
    get: {
      tags: ['User'],
      summary: 'Get one user with given id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the user to get',
        },
      ],
      responses: userResponse,
    },
    delete: {
      tags: ['User'],
      summary: 'Delete a user with id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the user to delete',
        },
      ],
    },
  },
};
