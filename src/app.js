import express from 'express';
import { create } from 'express-handlebars';
import path from 'path';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import multer from 'multer';
import { SOURCE_PATH } from './constants.js';
import HandlebarsHelpers from './lib/HandlebarsHelpers.js';
import DataSource from './lib/DataSource.js';
import { jwtAuth, jwtAuthAdmin, jwtAuthEditor } from './middleware/jwtAuth.js';
import authentication from './middleware/validation/Authentication.js';
import authenticationRegistration from './middleware/validation/AuthenticationRegistration.js';
import swaggerDefinition from './docs/swagger.js';
import { saveAvatar } from './middleware/saveAvatar.js';
import authenticationUser from './middleware/validation/AuthenticationUser.js';

import { home } from './controllers/home.js';
import { add } from './controllers/add.js';
import { song } from './controllers/song.js';
import { artist, artistDetail } from './controllers/artist.js';
import { album } from './controllers/album.js';
import { playlist, playlistDetail } from './controllers/playlist.js';
import { editAll, editAlbum, editArtist, editPlaylist, editSong, playlistDetailEdit, artistDetailEdit, albumArtist, songPlaylist } from './controllers/edit.js';

import { updateUser, postUpdateUser } from './controllers/updateUser.js';
import {
  postRegister,
  postLogin,
  logout,
  login,
  register,
} from './controllers/authentication.js';

import {
  getAllAlbums,
  getAlbum,
  postAlbum,
  deleteAlbum,
  updateAlbum
} from './controllers/api/album.js'

import {
  getAllArtists,
  getArtist,
  postArtist,
  deleteArtist,
  updateArtist
} from './controllers/api/artist.js'

import {
  getAllPlaylists,
  getPlaylist,
  postPlaylist,
  deletePlaylist,
  updatePlaylist,
  addSongToPlaylist,
  getMyPlaylist
} from './controllers/api/playlist.js'

import {
  getAllSongs,
  getSong, 
  postSong,
  deleteSong,
  updateSong	
} from './controllers/api/song.js'

import {
  getAllUsers,
  getUser,
  deleteUser,
  updateMeta
} from './controllers/api/user.js'
import { playMusic } from './controllers/api/playMusic.js';

dotenv.config();

// create express app
const app = express();

// serve static file
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// adding swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDefinition));

// Tell express to use the cookie parser
app.use(cookieParser());

// ------------ HANDLEBARS -----------//

// create an instance of express-handlebars
const hbs = create({
  extname: 'hbs',
  helpers: HandlebarsHelpers,
  allowProtoProperties: true,
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(SOURCE_PATH, 'views'));

// upload post endpoint
app.post('/uploadAvatar', multer().single('avatar'),jwtAuth, saveAvatar, (req, res) => {
  res.redirect('/');
});

// ---------- ROUTES ---------- //

app.get('/', jwtAuth, home);
app.get('/add', jwtAuthAdmin, add)
app.get('/song',jwtAuth, song)
app.get('/artist',jwtAuth, artist)
app.get('/detail/artist/:id',jwtAuth, artistDetail)
app.get('/album',jwtAuth, album)
app.get('/playlist',jwtAuth, playlist)
app.get('/detail/playlist/:id',jwtAuth, playlistDetail)
app.get('/edit',jwtAuthEditor, editAll)
app.get('/edit/playlist/:id',jwtAuthEditor, editPlaylist)
app.get('/edit/album/:id',jwtAuthEditor, editAlbum)
app.get('/edit/artist/:id',jwtAuthEditor, editArtist)
app.get('/edit/song/:id',jwtAuthEditor, editSong)
app.get('/edit/playlist/song/:id',jwtAuthEditor, playlistDetailEdit)
app.get('/edit/album/artist/:id',jwtAuthEditor, artistDetailEdit)
app.post('/user',jwtAuth, authenticationUser, postUpdateUser, updateUser)

app.get('/login', login);
app.get('/register', register);
app.post('/register', authenticationRegistration, postRegister, register);
app.post('/login', authentication, postLogin, jwtAuth, login);
app.post('/logout', authentication, logout);

// users
app.get('/api/user', jwtAuthAdmin, getAllUsers);
app.get('/api/user/:id', jwtAuthAdmin, getUser);
app.post('/api/user/:id',jwtAuthAdmin, deleteUser);
app.post('/api/meta',jwtAuth, updateMeta)

app.get('/api/album',jwtAuth, getAllAlbums);
app.get('/api/album/:id',jwtAuth, getAlbum);
app.post('/api/album/:id',jwtAuthAdmin, deleteAlbum);
app.post('/api/album',jwtAuthAdmin, postAlbum);
app.post('/api/update/album',jwtAuthEditor, updateAlbum);
app.put('/api/album',jwtAuthEditor, updateAlbum)

app.get('/api/artist',jwtAuth, getAllArtists);
app.get('/api/artist/:id',jwtAuth, getArtist);
app.post('/api/artist/:id',jwtAuthAdmin, deleteArtist);
app.post('/api/artist',jwtAuthAdmin, postArtist);
app.post('/api/update/artist',jwtAuthEditor, updateArtist);
app.put('/api/artist',jwtAuthEditor, updateArtist)
app.post('/album/artist/:id',jwtAuthEditor, albumArtist)

app.get('/api/playlist',jwtAuth, getAllPlaylists);
app.get('/api/playlist/:id',jwtAuth, getPlaylist);
app.get('/api/playlists/:userId',jwtAuth, getMyPlaylist);

app.post('/api/playlist/:id',jwtAuthAdmin, deletePlaylist);
app.post('/api/playlist', jwtAuthAdmin, postPlaylist);
app.post('/api/update/playlist',jwtAuthEditor, updatePlaylist);
app.post('/api/playlists/addSong',jwtAuthAdmin, addSongToPlaylist)
app.put('/api/playlist',jwtAuthEditor, updatePlaylist)
app.post('/playlist/song/:id',jwtAuthEditor, songPlaylist)


app.get('/api/song',jwtAuth, getAllSongs);
app.get('/api/song/:id',jwtAuth, getSong);
app.post('/api/song/:id',jwtAuthAdmin, deleteSong);
app.post('/api/song',jwtAuthAdmin, postSong);
app.post('/api/update/song',jwtAuthEditor, updateSong);
app.put('/api/song',jwtAuthEditor, updateSong)

app.post('/api/play/music/:id', playMusic)


//test

app.get('/test/api/song', getAllSongs);
app.get('/test/api/song/:id', getSong);
app.delete('/test/api/song/:id', deleteSong);
app.post('/test/api/song', postSong);
app.put('/test/api/song', updateSong)

app.get('/test/api/artist', getAllArtists);
app.get('/test/api/artist/:id', getArtist);
app.delete('/test/api/artist/:id', deleteArtist);
app.post('/test/api/artist', postArtist);
app.put('/test/api/artist', updateArtist)

app.get('/test/api/album', getAllAlbums);
app.get('/test/api/album/:id', getAlbum);

app.get('/test/api/playlist', getAllPlaylists);
app.get('/test/api/playlist/:id', getPlaylist);


if (process.env.NODE_ENV !== 'test')
  DataSource.initialize()
    .then(() => {
      app.listen(process.env.PORT, () => {
        console.log(
          `Application is running on http://localhost:${process.env.PORT}/.`
        );
      });
    })
    .catch((error) => {
      console.log('Error: ', error);
    });

export default app;
