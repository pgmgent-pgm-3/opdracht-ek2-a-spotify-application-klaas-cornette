import DataSource from '../lib/DataSource.js';

export const song = async (req, res) => {
    const songRepo = DataSource.getRepository('Song');
    const songs = await songRepo.find({
        relations: ['artist'],
      });
    res.render('song', {
        songs
    });
};