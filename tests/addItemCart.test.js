import '../src/setup.js';
import supertest from 'supertest';
import connection from '../src/database/database.js';
import app from '../src/app.js';
import createUser from '../factories/userFactory.js';
import createProduct from '../factories/productFactory.js';

describe('POST /cart', () => {
    beforeEach(async () => {
        await createUser();
        await createProduct();
    });

    test('return 201 if item added with logged user', async () => {
        const body = {
            user_id: 1,
            product_id: 1,
            quantity: 3,
        };
        const result = await supertest(app).post('/cart').send(body);

        expect(result.status).toEqual(201);
    });

    test('return 201 if item added with guest user', async () => {
        const body = {
            product_id: 1,
            quantity: 3,
        };
        const result = await supertest(app).post('/cart').send(body);

        expect(result.status).toEqual(201);
    });

    test('return 400 if product doesnt exist', async () => {
        const body = {
            user_id: 1,
            product_id: 333,
            quantity: 3,
        };
        const result = await supertest(app).post('/cart').send(body);

        expect(result.status).toEqual(401);
    });

    afterAll(async () => {
        await connection.query('DELETE FROM products');
        await connection.query('DELETE FROM users');
        await connection.query('ALTER SEQUENCE products_id_seq RESTART WITH 1')
        await connection.query('ALTER SEQUENCE users_id_seq RESTART WITH 1')
        connection.end();
    });
});