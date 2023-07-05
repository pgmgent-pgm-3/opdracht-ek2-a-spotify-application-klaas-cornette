import playlistResponse from '../responses/playlist.js';

export default {
  '/playlist': {
    summary: 'Get all playlist',
    description: 'Get all playlist in the database',
    get: {
      tags: ['Playlist'],
      summary: 'Get all playlist',
      responses: playlistResponse,
    },
    post: {
      tags: ['Playlist'],
      summary: 'create a new playlist',
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Playlist',
            },
          },
        },
      },
      responses: playlistResponse,
    },
    put: {
      tags: ['Playlist'],
    },
  },
  '/playlist/{id}': {
    summary: 'Get one playlist with given id',
    description: 'Get one playlist with given id',
    get: {
      tags: ['Playlist'],
      summary: 'Get one playlist with given id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the playlist to get',
        },
      ],
      responses: playlistResponse,
    },
    delete: {
      tags: ['Playlist'],
      summary: 'Delete a playlist with id',
      parameters: [
        {
          in: 'path',
          name: 'id',
          required: true,
          schema: {
            type: 'integer',
            minimum: 1,
          },
          description: 'ID of the playlist to delete',
        },
      ],
    },
  },
};
