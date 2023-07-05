/* eslint-disable prefer-const */
/* eslint-disable no-shadow */
import DataSource from '../../lib/DataSource.js';

export const getAllAlbums = async (req, res) => {
  try {
    const albumRepo = DataSource.getRepository('Album');
    const allAlbums = await albumRepo.find();
    res.status(201).json(allAlbums);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const getAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const albumRepo = DataSource.getRepository('Album');
    const album = await albumRepo.findBy({ id });
    res.status(201).json(album);
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params;
    const albumRepo = DataSource.getRepository('Album');
    const albumToDelete = await albumRepo.findOneBy({ id });
    await albumRepo.delete(albumToDelete);
    res.status(204).json({
      status: 'Entity is verwijderd',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const postAlbum = async (req, res) => {
  try {
    const albumRepo = DataSource.getRepository('Album');
    const artistRepo = DataSource.getRepository('Artist')
    const artist = await artistRepo.findOne({ 
      where: {name: req.body.artist_naam}
     });
     if(!artist){
      res.status(200).send('The artist does not excist');
        return next();
     }
     
    const postAlbum = {
      name: req.body.naam,
      artist: {
        id: artist.id
      }
    }
    const album = await albumRepo.save(postAlbum);
    res.status(201).json({
      status: 'Inserted with succses.',
      id: album.id,
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};

export const updateAlbum = async (req, res) => {
  try {
    const albumRepo = DataSource.getRepository('Album');
    const id  = req.body.id;
    const album = await albumRepo.findOneBy({ id: id });
    let update;
    update = {
      name: req.body.naam,
    };
    const updateAlbum = {
      ...album,
      ...update,
    };
    await albumRepo.save(updateAlbum);
    res.status(201).json({
      status: 'Inserted with succses.',
    });
  } catch (e) {
    res.status(500).json({
      status: e.message,
    });
  }
};
