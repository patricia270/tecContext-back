import connection from "../database/database.js";
import cartSchema from "../schema/cartSchema.js"

async function postCartItem (req,res) {
    let {product_id, quantity, user_id } = req.body;
    try {

        const user = await connection.query(`SELECT * FROM users WHERE id = $1`,[user_id])
        if (!user.rows[0]) user_id = (req.ip).replace(/^.*:/, '');

        const values = await cartSchema.validateAsync({ product_id, quantity})
    
        const prodResult = await connection.query(`SELECT * FROM products WHERE id = $1`,[product_id]);
        const product = prodResult.rows[0];

        if (!product) return res.sendStatus(400)
        if (product.stock_qtd < parseInt(quantity)) return res.sendStatus(400)

        const cartItem = await connection.query(`INSERT INTO cart (user_id,product_id,quantity) VALUES ($1,$2,$3)`, [user_id,product_id,quantity])
        //const updateQtd = await connection.query(`UPDATE products SET stock_qtd = $2 WHERE id = $1`,[product_id, product.stock_qtd - parseInt(quantity)])

        res.sendStatus(201)
    } catch (err) {
        console.log(err)
        res.sendStatus(401)
    }
}

export {postCartItem}