import DataSource from '../lib/DataSource.js';
import { getAvatars } from '../lib/helpers.js';

export const home = async (req, res) => {
  const avatars = getAvatars();
  const userRepo = await DataSource.getRepository('User');
  const user = await userRepo.findOne({
    where: { id: req.user.id },
    relations: ['role', 'meta', 'playlist'],
  });
  // console.log('User:', user);
  const metaRepo = await DataSource.getRepository('UserMeta');
  const meta = await metaRepo.findOne({
    where: { id: user.meta.id },
  });

  const songRepo = await DataSource.getRepository('Song');
  const song = await songRepo.find({});
  const playlist_id = user.playlist.id;
  const playlistRepo = await DataSource.getRepository('Playlist');
  const playlist = await playlistRepo.findOne({
    where: { id: playlist_id },
    relations: ['song'],
  });
  res.render('home', {
    user,
    avatars,
    meta,
    song,
    playlist,
  });
};
