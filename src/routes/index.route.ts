import { Router} from 'express';
import { login,logoutUser } from '../controllers/users.controller';

const indexRouter = Router();
indexRouter.post("/logout",logoutUser)
indexRouter.post("/",login)


export default indexRouter