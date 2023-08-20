import { Router } from "express";
import userController from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/users",userController.getAll);
userRouter.get("/user/:id",userController.getOneById);
userRouter.post("/user",userController.create);
userRouter.put("/user/:id",userController.update);
userRouter.delete("/user/:id",userController.delete);

export default userRouter;