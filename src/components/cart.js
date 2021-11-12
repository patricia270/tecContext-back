import connection from '../database/database.js';
import { cartSchema } from '../../Validation/Schemes.js';

async function postCartItem(req, res) {
    let { productId, quantity, userId } = req.body;
    try {
        const userResult = await connection.query(`SELECT * FROM users WHERE id = $1`, [userId]);
        const user = userResult.rows[0];
        const prodResult = await connection.query(`SELECT * FROM products WHERE id = $1`, [productId]);
        const product = prodResult.rows[0];
        await cartSchema.validateAsync({ quantity });

        if (!product) return res.sendStatus(401);
        if (!user) userId = '';
        // eslint-disable-next-line radix
        if (product.stock_qtd < parseInt(quantity)) return res.sendStatus(400);

        await connection.query(`INSERT INTO cart (user_id,product_id,quantity) VALUES ($1,$2,$3)`, [userId, productId, quantity]);

        res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(401);
    }
}

async function getCartItems(req, res) {
    let { id } = req.params;

    try {
        const userSession = await connection.query(`SELECT * FROM sessions WHERE user_id = $1`, [String(id)]);
        if (!userSession.rows[0]) id = 0;
        //  Will pass user_id if logged and '' as gues
        const items = await connection.query(`SELECT * FROM cart WHERE user_id = $1`, [String(id)]);

        res.send(items.rows);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

async function changeCartItem(req, res) {
    let { id } = req.params;
    const { productId, quantity } = req.body;
    if (id === 0) {
        id = '';
    } else {
        String(id);
    }
    try {
        if (quantity === 0) {
            await connection.query(`
                DELETE FROM cart WHERE product_id = $1 AND user_id = $2
            `, [productId, id]);
            return res.sendStatus(201);
        }
        await connection.query(`
            UPDATE cart SET quantity = $1 WHERE product_id = $2 AND user_id = $3`, [quantity, productId, id]);

        return res.sendStatus(201);
    } catch (err) {
        console.log(err);
        res.sendStatus(err);
    }
}

export { postCartItem, getCartItems, changeCartItem };
