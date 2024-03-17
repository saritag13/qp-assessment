import { Request, Response,NextFunction } from 'express';
import { connect } from "../databaseConfig"
import Users from '../models/users';
import {getToken} from '../utils/token'
import  {hash,compare} from 'bcryptjs';
import { isAdmin } from '../utils/autherization';
type RequestWithUser = Request & {user: Users};
export async function createUser(req: Request, res: Response) {
    const newUser: Users = req.body;
    try {
            hash(req.body.password, 8, async function (err, password_hash) {
            newUser.password=password_hash;
            const conn = await connect();
            await conn.query(`INSERT INTO users SET ?`, [newUser])
            return res.status(200).json({
                message: "User added successFully"
            });
    
            
        })
        
    } catch (error) {
        return res.status(500).json({
            error: "Error in creating User"
        })
    }
    
    
}
export async function getUsers(req: Request | RequestWithUser, res: Response,next:NextFunction): Promise<Response> {
    try {
        let isAuth:Boolean= await isAdmin(req,res)
        if(isAuth) {
            const conn = await connect();
            const users = await conn.query("SELECT userName,userType,email,mobileNumber FROM users");
            return res.status(200).json(users[0]);
        }else{
            return res.status(401).json({ error: 'Unauthorized Request! Only for Autherized Admin ' });
        }  
        
    } catch (error) {
        console.debug(error)
        return res.status(500).json({
            error: "Error in getting User"
        })
        
    }
    
}
export async function login(req: Request, res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    try {

        const conn = await connect();
        const userFound:any = await conn.query("SELECT userId, userType, userName,email,mobileNumber,password FROM users WHERE email = ?",email);
        if(userFound.length){
            const res1=await compare(password,userFound[0][0].password)
            if (!res1) {
                return res.status(401).json({ error: "old password does not match !!" });
            }else{
                delete userFound[0][0].password;
                let token:any=await getToken(userFound[0][0])
                res.setHeader("Access-Control-Expose-Headers", "X-Auth-Token");
                res.setHeader('x-auth-token', token);
                return res.status(200).send({message:"Login successFull"});
            }
                       
        }
        
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            error: "Error in logIn user"
        })
        
    }
    
}
export async function updateUser(req: Request, res: Response) {
    const id = req.params.itemId;
    const updateItem: Users = req.body;
    try {
        const conn = await connect();
        await conn.query(`UPDATE users SET ? WHERE id = ?`, [updateItem, id])
        return res.status(200).json({
            message: "User updated"
        })
        
    } catch (error) {
        return res.status(500).json({
            error: "Error in updating User"
        })
        
    }
    
}
export async function logoutUser(req: Request, res: Response){
    console.log("in logout===>")
    if(req.user){
        req.user={}
        return res.status(200).json({
            message: "User Logged out successfully"
        })
    }else{
        return res.status(400).json({
            error: "Error in logout"
        }) 
    }
}


