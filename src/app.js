import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/account.js';
import { getProducts, getPromotionsProducts, getLaptops } from './controllers/products.js';
import { getCartItems, postCartItem, changeCartItem } from './components/cart.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

app.get('/products', getProducts);
app.get('/promotions', getPromotionsProducts);
app.get('/laptops', getLaptops);

app.post('/cart', postCartItem);
app.put('/cart/:id', changeCartItem);
app.get('/cart/:id', getCartItems);

export default app;
