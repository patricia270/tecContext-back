import faker from "faker/locale/pt_BR";
import connection from "../src/database/database.js";

export default async function createProduct() {
    const prod = {
        price: parseInt(faker.commerce.price()) ,
        category_id: 1,
        stock_qtd: faker.datatype.number(),
        name: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl()
    };

    try {
        await connection.query(`
        INSERT INTO products (price,category_id,stock_qtd,name,description,image)
        VALUES ($1,$2,$3,$4,$5,$6)  
        `,[prod.price,prod.category_id,prod.stock_qtd,prod.name,prod.description,prod.image])
    } catch (err) {
        console.log(err)
    }
    

}