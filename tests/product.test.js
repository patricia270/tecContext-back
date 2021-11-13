/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';
import createProduct from '../factories/productFactory.js';

const productId = 1;

beforeAll(async () => {
    await connection.query('DELETE FROM products');
});

afterAll(async () => {
    await connection.query('DELETE FROM products');
    await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
    connection.end();
});

describe('GET /PRODUCT/:ID', () => {
    test('return 404 for product not found', async () => {
        const result = await supertest(app).get(`/product/${productId}`);
        expect(result.status).toEqual(404);
    });

    test('return 200 for product found', async () => {
        await createProduct();
        const result = await supertest(app).get(`/product/${productId}`);
        expect(result.status).toEqual(200);
    });
});
