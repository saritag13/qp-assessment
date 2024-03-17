import * as passportStrategy from "passport-local";
import passport from "passport";
import bcrypt from "bcrypt";
import { Express, Request, Response, NextFunction } from "express";
import  Users from "../models/users";
import { connect } from "../databaseConfig"

export function initPassport(app: Express) {
    // const usersDB:Users;
    // usersDB.initUsers();    
    app.use(passport.initialize());
    app.use(passport.authenticate('session'));

    passport.use(new passportStrategy.Strategy(
        { usernameField: "email",passwordField: 'password'}, async (email, password, done) => {
            try {
                if (!email) { done(null, false) }
                const conn = await connect();
                const userFound:any=await conn.query(`SELECT userId, userType, userName,email, password FROM users WHERE email=?`, email)
                if(userFound.length && userFound[0].length>0){
                    let user=userFound[0][0];
                    if (user.email == email && await bcrypt.compare(password, (user.password).toString())) {
                        delete user.password
                        done(null, user);

                    } else {
                        done(null, false, { message: "User or password incorrect"});

                    }
                }else{
                    done(null, false, { message: "User or password incorrect"});
                }
                
            } catch (e) {
                done(e);
            }
        }));
    
        passport.serializeUser((req: Request, user: any, done: (arg0: null, arg1: any) => void) => {
            done(null, user);
        });
    
    
       passport.deserializeUser(async (user: any, done) => {
            // const conn = await connect();
            //     const userFound:any=await conn.query(`SELECT userId, userType, userName,email FROM users WHERE email=?`, email)
            // const u = usersDB.findUser(user.email);
            done(null, user);
        });

}
export function isAuthenticated(req: Request ,res: Response, next: NextFunction): Response | void {
        if(req.user)
           return next();
        else
            res.redirect("/"); 
}