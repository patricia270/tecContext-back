import express from 'express';
import cors from 'cors';
import { signIn, signUp } from './controllers/account.js';
import { postCartItem} from './components/cart.js'

const app = express();

app.use(express.json());
app.use(cors());

app.post('/sign-up', signUp);
app.post('/sign-in', signIn);

app.post('/cart', postCartItem)

export default app;
