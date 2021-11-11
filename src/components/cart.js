import connection from "../database/database.js";
import { cartSchema } from "../../Validation/Schemes.js";

async function postCartItem (req,res) {
    let {product_id, quantity, user_id } = req.body;
    try {

        const userResult = await connection.query(`SELECT * FROM users WHERE id = $1`,[user_id])
        const user = userResult.rows[0];
        const prodResult = await connection.query(`SELECT * FROM products WHERE id = $1`,[product_id]);
        const product = prodResult.rows[0];
        const values = await cartSchema.validateAsync({quantity})    

        if (!product) return res.sendStatus(401)
        if (!user) user_id = ''
        if (product.stock_qtd < parseInt(quantity)) return res.sendStatus(400)

        const cartItem = await connection.query(`INSERT INTO cart (user_id,product_id,quantity) VALUES ($1,$2,$3)`, [user_id,product_id,quantity])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(401)
    }
}

export {postCartItem}