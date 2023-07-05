import typeorm from 'typeorm';

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Playlist',
  tableName: 'playlist',
  columns: {
    id: {
      type: 'int',
      primary: true,
      generated: true,
    },
    name: {
      type: 'varchar',
    },
  },
  relations: {
    user: {
      target: 'User',
      type: 'one-to-one',
      joinColumn: {
        name: 'user_id',
      },
      onDelete: 'CASCADE',
    },
    song: {
      type: 'many-to-many',
      target: 'Song',
      joinTable: {
        name: 'playlists_has_songs',
        joinColumns: [{ name: 'id_playlist', referencedColumnName: 'id' }],
        inverseJoinColumns: [{ name: 'id_song', referencedColumnName: 'id' }],
      },
    },
  },
});
