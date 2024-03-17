import { Router } from 'express';
import { createUser,getUsers,updateUser } from '../controllers/users.controller';
const userRouter = Router();
userRouter.route("/").get(getUsers);
userRouter.route("/").post(createUser);
userRouter.route("/:itemId").put(updateUser);

export default userRouter;

