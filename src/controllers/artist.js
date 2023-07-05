import DataSource from '../lib/DataSource.js';

export const artist = async (req, res) => {
    const artistRepo = DataSource.getRepository('Artist');
    const artists = await artistRepo.find({
        relations: ['album'],
      });
    res.render('artist', {
        artists
    });
};

export const artistDetail = async (req, res) => {
    const artistRepo = DataSource.getRepository('Artist');
    const id = req.params;
    const artist = await artistRepo.findOne({
        where: id,
        relations: ['album', 'song'],
      });
      console.log(artist)
    res.render('detailArtist', {
        artist
    });
};