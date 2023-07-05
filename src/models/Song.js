import typeorm from 'typeorm';

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Song',
  tableName: 'song',
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
    artist: {
      target: 'Artist',
      type: 'one-to-one',
      joinColumn: {
        name: 'artist_id',
      },
      onDelete: 'CASCADE',
    },
    playlist: {
      type: 'many-to-many',
      target: 'Playlist',
      joinTable: {
        name: 'playlists_has_songs',
        joinColumns: [{ name: 'id_song', referencedColumnName: 'id' }],
        inverseJoinColumns: [
          { name: 'id_playlist', referencedColumnName: 'id' },
        ],
      },
    },
  },
});
