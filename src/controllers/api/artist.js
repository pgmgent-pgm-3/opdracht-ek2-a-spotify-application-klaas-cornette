/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import DataSource from '../../lib/DataSource.js';

export const getAllArtists = async (req, res) => {
  try {
    const artistRepo = DataSource.getRepository('Artist');
    const allArtists = await artistRepo.find();
    res.status(201).json(allArtists);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artistRepo = DataSource.getRepository('Artist');
    const artist = await artistRepo.findBy({ id });
    res.status(201).json(artist);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deleteArtist = async (req, res) => {
  try {
    const { id } = req.params;
    const artistRepo = DataSource.getRepository('Artist');
    const artistToDelete = await artistRepo.findOneBy({ id });
    await artistRepo.delete(artistToDelete);
    res.status(204).json({
      status: 'Entity is verwijderd',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const postArtist = async (req, res, next) => {
  try {
    const artistRepo = DataSource.getRepository('Artist');
    const postArtist = {
      name: req.body.naam,
    }
    const artist = await artistRepo.save(postArtist);
    res.status(201).send({
      status: 'Inserted with succses.',
      id: artist.id,
  });
    return next();
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const updateArtist = async (req, res) => {
  try {
    const artistRepo = DataSource.getRepository('Artist');
    const id  = req.body.id;
    const artist = await artistRepo.findOneBy({ id: id });
    let update;
    update = {
      name: req.body.naam,
    };
    const updateArtist = {
      ...artist,
      ...update,
    };
    await artistRepo.save(updateArtist);
    res.status(201).json({
      status: 'Inserted with succses.',
    });
    
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
