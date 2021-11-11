import dotenv from 'dotenv';

dotenv.config({
    path: process.env.NODE_ENV === 'prod' ? '.env' : '.env.test',
});
