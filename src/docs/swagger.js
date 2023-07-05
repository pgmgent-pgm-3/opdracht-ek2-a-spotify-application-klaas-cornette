import schemas from './schemas.js';
import paths from './paths/index.js';

export default {
  openapi: '3.0.0',
  info: {
    version: '1.0.0',
    title: 'Swagger herexamen pgm3',
    description: 'this is an API to call HTTP methods and alter data',
    license: {
      name: 'Klaas Cornette',
    },
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'This is the developemnt server',
    },
  ],
  tags: [],
  paths,
  components: {
    schemas,
  },
};
