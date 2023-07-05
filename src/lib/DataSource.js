import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

import Album from '../models/Album.js';
import Artist from '../models/Artist.js';
import Playlist from '../models/Playlist.js';
import Role from '../models/Role.js';
import Song from '../models/Song.js';
import User from '../models/User.js';
import UserMeta from '../models/UserMeta.js';


dotenv.config();

const entities = [
  Album,
  Artist,
  Playlist,
  Role,
  UserMeta,
  Song,
  User,
];
const DS = new DataSource({
  type: process.env.DATABASE_TYPE,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  entities,
});

export default DS;
