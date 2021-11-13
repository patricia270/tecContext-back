import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';

beforeEach(async () => {
    await connection.query(`
        INSERT INTO categories (name) VALUES ('Notebooks'),
         ('Computadores'), ('Impressoras'), ('Smartphones'),
         ('Tablets'), ('Videogames'), ('Acessórios')       
    ;`);
});

afterEach(async () => {
    await connection.query('DELETE FROM categories');
    await connection.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1');
});

describe('GET /categories', () => {
    test('return 200 for GET/categories', async () => {
        const result = await supertest(app).get('/categories');
        expect(result.status).toEqual(200);
    });
});

afterAll(async () => {
    connection.end();
});
