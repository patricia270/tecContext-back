import express from 'express'
import cors from 'cors'
import { postCartItem , getCartItems} from './components/cart.js'

const app = express();
app.use(cors())
app.use(express.json());

app.post('/cart', postCartItem)
app.get('/cart/:user_id', getCartItems)

export default app