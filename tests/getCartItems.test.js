/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import connection from '../src/database/database.js';
import app from '../src/app.js';
import createUser from '../factories/userFactory.js';
import createProduct from '../factories/productFactory.js';

describe('Get /cart/:id', () => {
    beforeEach(async () => {
        await createUser();
        await createProduct();
    });

    test('return 200 for successful cart aquisition logged', async () => {
        const result = await supertest(app).get('/cart/1');

        expect(result.status).toEqual(200);
    });

    test('return 200 for successful cart aquisition logged', async () => {
        const result = await supertest(app).get('/cart/0');
        expect(result.status).toEqual(200);
    });

    afterAll(async () => {
        await connection.query('DELETE FROM products');
        await connection.query('DELETE FROM users');
        await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1');
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1');
        connection.end();
    });
});
