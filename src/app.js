import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/account.js';
import { getProducts, getPromotionsProducts } from './controllers/products.js';
import { getCartItems, postCartItem, changeCartItem } from './components/cart.js';
import { getProductInfo } from './controllers/product.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

app.get('/products', getProducts);
app.get('/promotions', getPromotionsProducts);

app.post('/cart', postCartItem);
app.put('/cart/:id', changeCartItem);
app.get('/cart/:id', getCartItems);

app.get('/product/:id', getProductInfo);

export default app;
