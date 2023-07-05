export default {
  User: {
    properties: {
      id: { type: 'number' },
      email: { type: 'string' },
      password: { type: 'string' },
      meta: {
        $ref: '#/components/schemas/UserMeta',
      },
      role: {
        $ref: '#/components/schemas/Role',
      },
      playlist: {
        $ref: '#/components/schemas/Playlist',
      },
    },
  },
  UserMeta: {
    properties: {
      id: { type: 'number' },
      firstname: { type: 'string' },
      lastname: { type: 'string' },
      username: { type: 'string' },
      avatar: { type: 'string' },
      user: {
        $ref: '#/components/schemas/User',
      },
    },
  },
  Song: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist: {
        $ref: '#/components/schemas/Artist',
      },
      playlist: {
        $ref: '#/components/schemas/Playlist',
      },
    },
  },
  Role: {
    properties: {
      id: { type: 'number' },
      lable: { type: 'string' },
      user: {
        $ref: '#/components/schemas/User',
      },
    },
  },
  Playlist: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      user: {
        $ref: '#/components/schemas/User',
      },
      song: {
        $ref: '#/components/schemas/Song',
      },
    },
  },
  Artist: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      song: {
        $ref: '#/components/schemas/Song',
      },
      album: {
        $ref: '#/components/schemas/Album',
      },
    },
  },
  Album: {
    properties: {
      id: { type: 'number' },
      name: { type: 'string' },
      artist: {
        $ref: '#/components/schemas/Artist',
      },
    },
  },
};
