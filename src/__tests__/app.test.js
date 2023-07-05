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
    const songRepo = DataSource.getRepository('Song')
    test('GET - /api/song', async () => {
      const response = await request(app).get('/api/song');
      expect(response.statusCode).toBe(201);
      expect(Array.isArray(response.body)).toBeTruthy();
    });

    test('GET - /api/song/:id', async () => {
      const response = await request(app).get('/api/song/1');
      expect(response.statusCode).toBe(201);
    });

    test('POST - /api/song', async () => {
      const song = {
        name: 'test',
        artist: {
          id: 2,
        }
      };
      const response = await request(app).post('/api/song').send(song);
      // controleren op statuscode
      expect(response.statusCode).toBe(201);
      expect(response.body).toHaveProperty('id');
    });
    test('PUT - /api/song', async () => {
      const song = songRepo.findOne({
        where: {name: 'test'}
      })
      const update = {
        ...song,
        name: 'updateTest',
      };
      const response = await request(app).put('/api/song').send(update);
      expect(response.status).toBe(201);
    });

    test('DELETE - /api/song', async () => {
      const song = songRepo.findOne({
        where: {name: 'updateTest'}
      })
      const response = await request(app).delete('/api/song').send(song);
      expect(response.status).toBe(204);
    });
    
  });
});
