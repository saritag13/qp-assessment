import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
export async function getToken(tokenObj:any):Promise<String> {
    dotenv.config();
    const expiresIn = '1 year';
    const secretOrKey:any =  process.env.JWT_TOKEN_SECRET;
    const token = jwt.sign(tokenObj, secretOrKey, {
        expiresIn: expiresIn
    });
    return token;
}