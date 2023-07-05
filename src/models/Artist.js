import typeorm from 'typeorm';

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Artist',
  tableName: 'artist',
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
    album: {
      target: 'Album',
      type: 'one-to-many',
      cascade: true,
      onDelete: 'CASCADE',
      inverseSide: 'artist',
    },
    song: {
      target: 'Song',
      type: 'one-to-one',
      cascade: true,
      inverseSide: 'artist',
    },
  },
});
