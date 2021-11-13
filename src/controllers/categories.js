import connection from '../database/database.js';

async function getCategories(req, resp) {
    try {
        const result = await connection.query('SELECT * FROM categories');
        resp.send(result.rows);
    } catch (error) {
        resp.sendStatus(500);
    }
}

export default getCategories;
