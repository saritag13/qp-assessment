import {NextFunction} from 'express';
 export function strategy(req: any, res: any,next:NextFunction) {
    if (req.params.userType == "admin") {
        req.strategy = 'local-admin'
    }else if ((req.params.userType == "user")){
        req.strategy = 'local-user'
    }
   

       
        next();
}
