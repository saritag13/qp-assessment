import { Request,Response,NextFunction } from "express";
import Users from "../models/users";

type RequestWithUser = Request & {user: Users};
export async function isAuthorized(req: RequestWithUser, res: Response){
    if (req.params.id != req.user.id) {
        return res.status(401).json({ error: 'Unauthorized Request!' });
    }
    // next();
    
}

export async function isAdmin(req:any, res: Response){
    if (req.user && req.user.userType == "Admin") {
        return true 
    }else{
        return false

    }
    
}
export async function isUser(req: any, res: Response){
    if (req.user && req.user.userType == "User") {
        return true 
    }else{
        return false
    }
    
}