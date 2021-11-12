// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker/locale/pt_BR';
import connection from '../src/database/database.js';

export default async function createProduct() {
    const prod = {
        price: parseInt(faker.commerce.price()),
        discount: faker.datatype.number({
            min: 0,
            max: 1,
        }),
        category_id: 1,
        stock_qtd: faker.datatype.number(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(),
    };

    console.log(prod);

    try {
        await connection.query(`
        INSERT INTO products (image, name, description, price, discount, stock_qtd, category_id)
        VALUES ($1, $2, $3, $4, $5, $6, $7)  
        ;`, [prod.image, prod.name, prod.description, prod.price, prod.discount, prod.stock_qtd, prod.category_id]);
    } catch (err) {
        console.log(err);
    }
}
