import "../src/setup.js"
import supertest from "supertest";
import connection from "../src/database/database.js";
import app from "../src/app.js";


describe('POST /cart', () => {
    test('return 201 if item added with logged user', async () => {
        const body = {
            user_id:1,
            product_id:1,
            quantity: 3
        }
        const result = await supertest(app).post('/cart').send(body)

        expect(result.status).toEqual(201)
    })

    test('return 201 if item added with guest user', async () => {
        const body = {
            product_id:1,
            quantity: 3
        }
        const result = await supertest(app).post('/cart').send(body)

        expect(result.status).toEqual(201)
    })

    test('return 400 if product doesnt exist', async () => {
        const body = {
            user_id:1,
            product_id:2,
            quantity: 3
        }

        const result = await supertest(app).post('/cart').send(body)

        expect(result.status).toEqual(400)
    })
    
    afterAll(() => {
        connection.end()
    })
})