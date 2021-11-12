import connection from '../database/database.js';

async function getProducts(req, resp) {
    try {
        const result = await connection.query(`
        SELECT products.id, products.image, products.name, 
            products.description, products.price, products.discount, products.stock_qtd, 
            categories.name AS "category" FROM products 
        JOIN categories ON products.category_id = categories.id;
        `);
        resp.send(result.rows);
    } catch (error) {
        resp.sendStatus(500);
    }
}

async function getPromotionsProducts(req, resp) {
    try {
        const result = await connection.query(`
        SELECT products.id, products.image, products.name, 
            products.description, products.price, products.discount, products.stock_qtd, 
            categories.name AS "category" FROM products 
        JOIN categories ON products.category_id = categories.id WHERE products.discount > 0;
        `);
        resp.send(result.rows);
    } catch (error) {
        resp.sendStatus(500);
    }
}

async function getLaptops(req, resp) {
    try {
        const result = await connection.query(`
        SELECT products.id, products.image, products.name, 
            products.description, products.price, products.discount, products.stock_qtd, 
            categories.name AS "category" FROM products 
        JOIN categories ON products.category_id = categories.id WHERE category_id = 1;
        `);
        resp.send(result.rows);
    } catch (error) {
        console.log(error);
    }
}

export {
    getProducts,
    getPromotionsProducts,
    getLaptops,
};
