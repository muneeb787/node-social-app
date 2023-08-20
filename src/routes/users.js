import { Router } from "express";
import userController from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/users",userController.getAll);

export default userRouter;