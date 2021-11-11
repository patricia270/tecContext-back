/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import createUser from '../factories/userFactory.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';

let user;

beforeAll(async () => {
    user = await createUser();
});

afterAll(async () => {
    connection.end();
});

describe('POST /SIGN-IN', () => {
    afterEach(async () => {
        await connection.query('DELETE FROM users;');
    });

    test('return 200 for successful login', async () => {
        const result = await supertest(app).post('/sign-in').send({ email: user.email, password: user.password });
        expect(result.status).toEqual(200);
    });

    test('return 401 for unauthorized user', async () => {
        const result = await supertest(app).post('/sign-in').send({ email: user.email, password: user.password });
        expect(result.status).toEqual(401);
    });

    test('return 400 for invalid input', async () => {
        const result = await supertest(app).post('/sign-in');
        expect(result.status).toEqual(400);
    });
});
