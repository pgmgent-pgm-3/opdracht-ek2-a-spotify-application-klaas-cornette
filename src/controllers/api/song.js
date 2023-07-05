/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import DataSource from '../../lib/DataSource.js';

export const getAllSongs = async (req, res) => {
  try {
    const songRepo = DataSource.getRepository('Song');
    const allSongs = await songRepo.find();
    res.status(201).json(allSongs);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getSong = async (req, res) => {
  try {
    const { id } = req.params;
    const songRepo = DataSource.getRepository('Song');
    const song = await songRepo.findBy({ id });
    res.status(201).json(song);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deleteSong = async (req, res) => {
  try {
    const { id } = req.params;
    const songRepo = DataSource.getRepository('Song');
    const songToDelete = await songRepo.findOneBy({ id });
    await songRepo.delete(songToDelete);
    res.status(204).json({
      status: 'Entity is verwijderd',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const postSong = async (req, res, next) => {
  try {
    const songRepo = DataSource.getRepository('Song');
    const artistRepo = DataSource.getRepository('Artist');
    const artist = await artistRepo.findOne({
      where: { name: req.body.artist_naam },
    });
    if (!artist) {
      res.status(200).send('The artist does not excist');
      return next();
    }

    const postSong = {
      name: req.body.naam,
      artist: {
        id: artist.id,
      },
    };
    const song = await songRepo.save(postSong);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: song.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const updateSong = async (req, res) => {
  try {
    const songRepo = DataSource.getRepository('Song');
    const { id } = req.body;
    const song = await songRepo.findOneBy({ id });
    let update;
    update = {
      name: req.body.naam,
    };
    const updateSong = {
      ...song,
      ...update,
    };
    await songRepo.save(updateSong);
    res.status(201).json({
      status: 'Inserted with succses.',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
