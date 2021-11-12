import connection from '../database/database.js';

async function getProductInfo(req, res) {
    const { id } = req.params;

    try {
        const result = await connection.query('SELECT * FROM products WHERE id = $1', [id]);

        if (!result.rowCount) return res.sendStatus(404);

        return res.send(result.rows);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

// eslint-disable-next-line import/prefer-default-export
export { getProductInfo };
