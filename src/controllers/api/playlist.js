/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import DataSource from '../../lib/DataSource.js';

export const getAllPlaylists = async (req, res) => {
  try {
    const playlistRepo = DataSource.getRepository('Playlist');
    const allPlaylists = await playlistRepo.find();
    res.status(201).json(allPlaylists);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getPlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlistRepo = DataSource.getRepository('Playlist');
    const playlist = await playlistRepo.findBy({ id });
    res.status(201).json(playlist);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlistRepo = DataSource.getRepository('Playlist');
    const playlistToDelete = await playlistRepo.findOneBy({ id });
    await playlistRepo.delete(playlistToDelete);
    res.status(204).json({
      status: 'Entity is verwijderd',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const postPlaylist = async (req, res) => {
  try {
    const playlistRepo = DataSource.getRepository('Playlist');
    const postPlaylist = {
      name: req.body.naam,
      user: {
        id: req.user.id,
      },
    };
    const playlist = await playlistRepo.save(postPlaylist);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: playlist.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const addSongToPlaylist = async (req, res) => {
  try {
    const playlistRepo = DataSource.getRepository('Playlist');
    const songRepo = DataSource.getRepository('Song');
    const playlistCheck = await playlistRepo.findOne({
      where: { name: req.body.naam },
      relations: ['song'],
    });
    if (!playlistCheck) {
      res.status(200).send('The playlist does not excist');
      return next();
    }
    const song = await songRepo.findOne({
      where: { name: req.body.songnaam },
    });
    if (!song) {
      res.status(200).send('The song does not excist');
      return next();
    }
    const postPlaylist = {
      ...playlistCheck,
      song: [
        ...playlistCheck.song,
        {
          id: song.id,
        },
      ],
    };
    const playlist = await playlistRepo.save(postPlaylist);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: playlist.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const updatePlaylist = async (req, res) => {
  try {
    const playlistRepo = DataSource.getRepository('Playlist');
    const { id } = req.body;
    const playlist = await playlistRepo.findOneBy({ id });
    let update;
    update = {
      name: req.body.naam,
    };
    const updatePlaylist = {
      ...playlist,
      ...update,
    };
    await playlistRepo.save(updatePlaylist);
    res.status(201).json({
      status: 'Inserted with succses.',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getMyPlaylist = async (req, res) => {
  try {
    const userRepo = DataSource.getRepository('User');
    const { userId } = req.params;
    const user = await userRepo.findOne({
      where: { id: userId },
      relations: ['playlist'],
    });
    console.log(userId);
    const { playlist } = user;
    res.status(201).json(playlist);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
