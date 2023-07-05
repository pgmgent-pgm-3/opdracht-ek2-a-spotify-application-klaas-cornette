import DataSource from '../lib/DataSource.js';

export const playlist = async (req, res) => {
    const userRepo = DataSource.getRepository('User');
    const id = req.user.id
    const user = await userRepo.findOne({
        where: id,
        relations: ['playlist'],
      });
    const playlistRepo = DataSource.getRepository('Playlist');
    const playlists = await playlistRepo.find({
        relations: ['song'],
      });
    const myPlaylists = user.playlist
    res.render('playlist', {
        playlists,
        myPlaylists
    });
};

export const playlistDetail = async (req, res) => {
    const playlistRepo = DataSource.getRepository('playlist');
    const id = req.params;
    const playlist = await playlistRepo.findOne({
        where: id,
        relations: ['song'],
      });
    res.render('detailPlaylist', {
        playlist
    });
};

