import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/account.js';
import { getCartItems, postCartItem } from './components/cart.js'

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

app.post('/cart', postCartItem)
app.get('/cart/:id', getCartItems)

export default app;
