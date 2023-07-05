import typeorm from "typeorm";

const { EntitySchema } = typeorm;
export default new EntitySchema({
  name: "User",
  tableName: "users",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    email: {
      type: "varchar",
    },
    password: {
      type: "varchar",
    },
  },
  relations: {
    meta: {
      target: "UserMeta",
      type: "one-to-one",
      cascade: true,
      inverseSide: "user",
    },
    role: {
      target: "Role",
      type: "many-to-one",
      cascade: true,
      inverseSide: "users",
    },
    playlist: {
      target: "Playlist",
      type: "one-to-one",
      cascade: true,
      inverseSide: "user",
    },
  },
});
