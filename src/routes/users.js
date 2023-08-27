import { Router } from "express";
import userController from "../controllers/users.js";
import userSchemaValidator from "../validators/userValidation.js";

const userRouter = Router();

userRouter.get("/users",userController.getAll);
userRouter.get("/user/:id",userController.getOneById);
userRouter.post("/user", userSchemaValidator ,userController.create);
userRouter.put("/user/:id",userController.update);
userRouter.delete("/user/:id",userController.delete);
userRouter.get("/user/find/:search",userController.search);

export default userRouter;