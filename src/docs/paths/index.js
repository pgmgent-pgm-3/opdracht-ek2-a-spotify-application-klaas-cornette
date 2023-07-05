import album from './album.js';
import artist from './artist.js';
import playlist from './playlist.js';
import song from './song.js';
import user from './user.js';
import Usermeta from './usermeta.js';

export default {
  ...album,
  ...artist,
  ...playlist,
  ...song,
  ...user,
  ...Usermeta,
 
};
