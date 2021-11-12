import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/account.js';
import { getProducts, getPromotionsProducts } from './controllers/products.js';

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);
app.get('/products', getProducts);
app.get('/promotions', getPromotionsProducts);

export default app;
