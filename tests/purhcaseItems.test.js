/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import connection from '../src/database/database.js';
import app from '../src/app.js';
import createUser from '../factories/userFactory.js';
import createProduct from '../factories/productFactory.js';

describe('POST /cart/:id', () => {
    beforeEach(async () => {
        await createUser();
        await createProduct();
    });

    test('Return 201 if successful', async () => {
        const result = await supertest(app).post('/cart/1');

        expect(result.status).toEqual(201);
    });

    test('Return 401 if user not logged', async () => {
        const result = await supertest(app).post('/cart/1000');

        expect(result.status).toEqual(401);
    });

    afterAll(async () => {
        await connection.query('DELETE FROM products');
        await connection.query('DELETE FROM users');
        await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        connection.end();
    });
});
