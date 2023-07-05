/* eslint-disable no-undef */
import request from 'supertest';
import * as dotenv from 'dotenv';
import DataSource from '../lib/DataSource.js';
import app from '../app.js';

dotenv.config();

let server;
// een groep maken met describe
describe('API test', () => {
  beforeAll(async () => {
    // 1. create a connection with the database and WAIT!
    await DataSource.initialize();
    // 2. Application, start listening for incoming requests (used during test)
    server = app.listen(process.env.PORT, () => {
      console.log(
        `Application is running on http://localhost:${process.env.PORT}/.`
      );
    });
  });
  afterAll(async () => {
    // 1. close the connection with the database
    await DataSource.destroy();
    // 2. close the server
    server.close();
  });
  describe('Testing HTTP methods', () => {
    const songRepo = DataSource.getRepository('Song');
    const artistRepo = DataSource.getRepository('Artist');
    test('GET - /test/api/song', async () => {
      const response = await request(app).get('/test/api/song');
      expect(response.statusCode).toBe(201);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET - /test/api/song/:id', async () => {
      const response = await request(app).get('/test/api/song/1');
      expect(response.statusCode).toBe(201);
    });

    test('PUT - /test/api/song', async () => {
      const song = songRepo.findOne({
        where: { id: 4 },
      });
      const update = {
        ...song,
        name: 'updateTest',
      };
      const response = await request(app).put('/test/api/song').send(update);
      expect(response.status).toBe(201);
    });

    test('GET - /test/api/artist', async () => {
      const response = await request(app).get('/test/api/artist');
      expect(response.statusCode).toBe(201);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET - /test/api/artist/:id', async () => {
      const response = await request(app).get('/test/api/artist/1');
      expect(response.statusCode).toBe(201);
    });

    test('PUT - /test/api/artist', async () => {
      const artist = artistRepo.findOne({
        where: { id: 2 },
      });
      const update = {
        ...artist,
        name: 'updateTest',
      };
      const response = await request(app).put('/test/api/artist').send(update);
      expect(response.status).toBe(201);
    });

    test('GET - /test/api/album', async () => {
      const response = await request(app).get('/test/api/album');
      expect(response.statusCode).toBe(201);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET - /test/api/album/:id', async () => {
      const response = await request(app).get('/test/api/album/1');
      expect(response.statusCode).toBe(201);
    });

    test('GET - /test/api/playlist', async () => {
      const response = await request(app).get('/test/api/playlist');
      expect(response.statusCode).toBe(201);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET - /test/api/playlist/:id', async () => {
      const response = await request(app).get('/test/api/playlist/1');
      expect(response.statusCode).toBe(201);
    });
  });
});
