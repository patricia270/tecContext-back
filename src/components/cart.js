/* eslint-disable camelcase */
import connection from '../database/database.js';
import { cartSchema } from '../../Validation/Schemes.js';

async function postCartItem(req, res) {
    let { product_id, quantity, user_id } = req.body;
    try {
        const userResult = await connection.query('SELECT * FROM users WHERE id = $1', [user_id]);
        const user = userResult.rows[0];
        const prodResult = await connection.query('SELECT * FROM products WHERE id = $1', [product_id]);
        const product = prodResult.rows[0];
        await cartSchema.validateAsync({ quantity });

        if (!product) return res.sendStatus(401);
        if (!user) user_id = '';
        if (product.stock_qtd < parseInt(quantity, 10)) return res.sendStatus(400);

        await connection.query('INSERT INTO cart (user_id,product_id,quantity) VALUES ($1,$2,$3)', [user_id, product_id, quantity]);

        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(401);
    }
}

async function getCartItems(req, res) {
    let { id } = req.params;

    try {
        const userSession = await connection.query('SELECT * FROM sessions WHERE user_id = $1', [String(id)]);
        if (!userSession.rows[0]) id = 0;
        // Will pass user_id if logged and '' as guest
        const items = await connection.query('SELECT * FROM cart WHERE user_id = $1', [String(id)]);

        res.send(items.rows);
    } catch (err) {
        res.sendStatus(400);
    }
}

async function changeCartItem(req, res) {
    let { id } = req.params;
    const { product_id, quantity } = req.body;
    if (id === 0) {
        id = '';
    } else {
        String(id);
    }
    try {
        if (quantity === 0) {
            await connection.query(`
                DELETE FROM cart WHERE product_id = $1 AND user_id = $2
            `, [product_id, id]);
            return res.sendStatus(201);
        }
        await connection.query(`
            UPDATE cart SET quantity = $1 
            WHERE product_id = $2 
            AND user_id = $3`, [quantity, product_id, id]);

        return res.sendStatus(201);
    } catch (err) {
        return res.sendStatus(err);
    }
}

export { postCartItem, getCartItems, changeCartItem };
