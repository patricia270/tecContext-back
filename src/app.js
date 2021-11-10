import express from 'express'
import cors from 'cors'
import { postCartItem} from './components/cart.js'

const app = express();
app.use(cors())
app.use(express.json());

app.post('/cart', postCartItem)


export default app