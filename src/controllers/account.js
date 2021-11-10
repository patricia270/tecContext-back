import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import connection from '../database/database.js';
import { signUpSchema, signInSchema } from '../../Validation/Schemes.js';

async function signUp(req, res) {
    const { name, email, password } = req.body;

    if (signUpSchema.validate({ name, email, password }).error) {
        return res.sendStatus(400);
    }

    try {
        const result = await connection.query(
            'SELECT * FROM users WHERE email = $1;',
            [email],
        );

        if (result.rowCount) return res.sendStatus(409);

        const passwordHash = bcrypt.hashSync(password, 10);

        await connection.query(
            'INSERT INTO users(name, email, password) VALUES ($1, $2, $3);',
            [name, email, passwordHash],
        );

        return res.sendStatus(201);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

async function signIn(req, res) {
    const { email, password } = req.body;

    if (signInSchema.validate({ email, password }).error) {
        return res.sendStatus(400);
    }

    try {
        const result = await connection.query(
            'SELECT * FROM users WHERE email = $1;',
            [email],
        );

        const user = result.rows[0];

        if (user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();

            await connection.query(
                'INSERT INTO sessions (token, user_id) VALUES ($1, $2);',
                [token, user.id],
            );

            return res.send({ name: user.name, token });
        }
        return res.sendStatus(401);
    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

// eslint-disable-next-line import/prefer-default-export
export { signUp, signIn };
