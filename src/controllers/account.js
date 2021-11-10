import bcrypt from 'bcrypt';
import connection from '../database/database.js';
import { signUpSchema } from '../../Validation/Schemes.js';

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

// eslint-disable-next-line import/prefer-default-export
export { signUp };
