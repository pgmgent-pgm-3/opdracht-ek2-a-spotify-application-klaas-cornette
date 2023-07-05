import DataSource from '../lib/DataSource.js';

export const album = async (req, res) => {
  const albumRepo = DataSource.getRepository('Album');
  const albums = await albumRepo.find({
    relations: ['artist'],
  });
  res.render('album', {
    albums,
  });
};
