/* eslint-disable no-undef */
import '../src/setup.js';
import supertest from 'supertest';
import createUser from '../factories/userFactory.js';
import app from '../src/app.js';
import connection from '../src/database/database.js';

describe('POST /SIGN-UP', () => {
    let user;

    beforeAll(async () => {
        user = await createUser();
        await connection.query('DELETE FROM users');
    });

    afterAll(() => {
        connection.end();
    });

    test('return 201 for valid input', async () => {
        await connection.query('DELETE FROM users');
        const result = await supertest(app).post('/sign-up').send(user);
        expect(result.status).toEqual(201);
    });

    test('return 400 for invalid input', async () => {
        const result = await supertest(app).post('/sign-up');
        expect(result.status).toEqual(400);
    });

    test('return 409 for email already in use', async () => {
        const result = await supertest(app).post('/sign-up').send(user);
        expect(result.status).toEqual(409);
    });
});
