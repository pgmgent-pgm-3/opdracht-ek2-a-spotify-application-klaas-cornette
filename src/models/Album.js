import typeorm from 'typeorm';

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: 'Album',
  tableName: 'album',
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
      type: 'many-to-one',
      inverseSide: 'album',
      onDelete: 'CASCADE',
    },
  },
});
