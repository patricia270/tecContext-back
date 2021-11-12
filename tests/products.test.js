import '../src/setup.js';
import supertest from 'supertest';
import app from '../src/app.js';
import connection from '../src/database/database.js';

describe('GET /products', () => {
    beforeAll(async () => {
        await connection.query(`
            INSERT INTO products (image, name, description, price, discount, stock_qtd, category_id)
            VALUES ('https://a-static.mlcdn.com.br/618x463/notebook-lenovo-ultrafino-ideapad-3i-i3-10110u-4gb-1tb-15-6-win-10-prata/siberiano/134207448/283e3e595826b040383d5cda87b986c0.jpg',
            'Notebook Positivo Motion Q4128C', 'Intel Core i3-10110U, 4GB RAM, 256 GB SSD, Windows 10, 15.6, Prata',
             2739, 0.25, 100, 1);`);
    });

    test('return 200 for GET/promotions', async () => {
        const result = await supertest(app).get('/promotions');
        expect(result.status).toEqual(200);
    });

    test('return 200 for GET/products', async () => {
        const result = await supertest(app).get('/products');
        expect(result.status).toEqual(200);
    });
});
