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
    await connection.query('DELETE FROM products');
    await connection.query('DELETE FROM categories');
    await connection.query('ALTER SEQUENCE categories_id_seq RESTART WITH 1');
});

describe('GET /categories', () => {
    test('return 200 for GET/categories', async () => {
        const result = await supertest(app).get('/categories');
        expect(result.status).toEqual(200);
    });
});

describe('GET /categories/:categoryId', () => {
    beforeAll(async () => {
        await connection.query(`
        INSERT INTO products (image, name, description, price, discount, stock_qtd, category_id)
        VALUES ('https://img.ijacotei.com.br/produtos/200/200/81/45/17014581.jpg',
        'Smartphone Motorola G30', '128GB 4G Wi-Fi Tela 6.5'' Dual Chip 4GB RAM Câmera Quádrupla + Selfie 13MP - Dark Prism',
        2739, 0.25, 100, 4);
        `);
    });
    test('return 200 for GET/categories/:categoryId', async () => {
        const result = await supertest(app).get(`/categories/4`);
        expect(result.status).toEqual(200);
    });
});

afterAll(async () => {
    connection.end();
});
