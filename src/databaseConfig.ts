import { createPool } from 'mysql2/promise';
import dotenv from 'dotenv';

export async function connect() {
    dotenv.config();
    const sessionKey:any =  process.env.JWT_TOKEN_SECRET;
    const connection = await createPool({
        host: process.env.DB_HOST,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
        connectionLimit: 20
    });

    return connection;
}