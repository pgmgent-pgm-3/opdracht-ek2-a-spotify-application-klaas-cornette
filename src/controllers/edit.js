import DataSource from '../lib/DataSource.js';

export const editAll = async (req, res) => {
  const playlistRepo = DataSource.getRepository('Playlist');
  const playlists = await playlistRepo.find({});
  const userRepo = DataSource.getRepository('User');
  const users = await userRepo.find({});
  const user = await userRepo.findOne({
    where: { id: req.user.id },
    relations: ['role'],
  });
  const songRepo = DataSource.getRepository('Song');
  const songs = await songRepo.find({});
  const albumRepo = DataSource.getRepository('Album');
  const albums = await albumRepo.find({});
  const artistRepo = DataSource.getRepository('Artist');
  const artists = await artistRepo.find({});
  res.render('edit', {
    playlists,
    users,
    songs,
    albums,
    artists,
    user,
  });
};

export const editPlaylist = async (req, res) => {
  const id = req.params;
  res.render('editPlaylist', {
    id,
  });
};

export const editAlbum = async (req, res) => {
  const id = req.params;
  res.render('editAlbum', {
    id,
  });
};

export const editSong = async (req, res) => {
  const id = req.params;
  res.render('editSong', {
    id,
  });
};

export const editArtist = async (req, res) => {
  const id = req.params;
  res.render('editArtist', {
    id,
  });
};

export const playlistDetailEdit = async (req, res) => {
  const id = req.params;
  const playlistRepo = DataSource.getRepository('Playlist');
  const playlists = await playlistRepo.findOne({
    where: id,
    relations: ['song'],
  });
  res.render('playlistDetailEdit', {
    id,
    playlists,
  });
};

export const artistDetailEdit = async (req, res) => {
  const id = req.params;
  const albumRepo = DataSource.getRepository('Album');
  const albums = await albumRepo.findOne({
    where: id,
    relations: ['artist'],
  });
  const artistRepo = DataSource.getRepository('Artist');
  const artists = await artistRepo.findOne({
    where: albums.artist.id,
    relations: ['album'],
  });

  res.render('artistDetailEdit', {
    id,
    artists,
  });
};

export const albumArtist = async (req, res) => {
  try {
    const albumRepo = DataSource.getRepository('Album');
    const artistRepo = DataSource.getRepository('Artist');
    const id = req.params;
    const album = await albumRepo.findOne({
      where: id,
      relations: ['artist'],
    });
    const artist = await artistRepo.findOne({
      where: { id: album.artist.id },
      relations: ['album'],
    });

    const update = [];
    artist.album.forEach((e) => {
      if (id.id != e.id) {
        update.push(e);
      }
    });
    const updateArray = update.reduce(
      (accumulator, currentArray) => accumulator.concat(currentArray),
      []
    );
    console.log(updateArray);
    const updateArtist = {
      id: artist.id,
      album: [...updateArray],
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

export const songPlaylist = async (req, res) => {
  try {
    const playlistRepo = DataSource.getRepository('Playlist');
    const id = req.params;
    const id_playlist = req.body.id;
    const playlist = await playlistRepo.findOne({
      where: { id: id_playlist },
      relations: ['song'],
    });
    const update = [];
    playlist.song.forEach((e) => {
      if (id.id != e.id) {
        update.push(e);
      }
    });
    const updateArray = update.reduce(
      (accumulator, currentArray) => accumulator.concat(currentArray),
      []
    );
    const updatePlaylist = {
      ...playlist,
      song: [...updateArray],
    };
    console.log(updatePlaylist);
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
