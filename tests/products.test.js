import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import createProduct from '../factories/productFactory.js';

beforeEach(async () => {
    await connection.query(`
        INSERT INTO categories (name) VALUES ('Notebooks'),
         ('Computadores'), ('Impressoras'), ('Smartphones'),
         ('Tablets'), ('Videogames'), ('Acessórios')       
    ;`);
    await createProduct();
});

afterEach(async () => {
    await connection.query('DELETE FROM products');
    await connection.query('DELETE FROM categories');
    await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
    await connection.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1');
});

describe('GET /products', () => {
    test('return 200 for GET/products', async () => {
        const result = await supertest(app).get('/products');
        expect(result.status).toEqual(200);
    });
});

describe('GET /promotions', () => {
    test('return 200 for GET/promotions', async () => {
        const result = await supertest(app).get('/promotions');
        expect(result.status).toEqual(200);
    });
});

afterAll(async () => {
    connection.end();
});
