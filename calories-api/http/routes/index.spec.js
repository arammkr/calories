/*
jest.mock('@db/index.js', () => {
  const SequelizeMock = require('sequelize-mock');
  SequelizeMock.SMALLINT = {};

  return {
    sequelize: new SequelizeMock(),
    DataTypes: SequelizeMock,
  };
});

*/

const request = require('supertest');
const app = require('../../app.js');

describe('Common /GET routes', () => {
  let server;

  beforeAll(() => {
    server = request(app);
  });

  describe('GET /does/not/exist', () => {
    it('should response with 404 http status', async () => {
      const response = await server.get('/does/not/exist');
      expect(response.status).toBe(404);
    });

    it('should content type be equal application/json', async () => {
      const response = await server.get('/does/not/exist');
      expect(response.type).toBe('application/json');
    });

    it('should has property "success"', async () => {
      const response = await server.get('/does/not/exist');
      expect(response.body).toHaveProperty('success', false);
    });

    it('should has property "message"', async () => {
      const response = await server.get('/does/not/exist');
      expect(response.body).toHaveProperty('error', 'Resource not Found');
    });
  });
});
