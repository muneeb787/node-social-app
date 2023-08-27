import { Router } from "express";
import userController from "../controllers/users.js";
import userSchemaValidator from "../validators/userValidation.js";
import loginAuthorization from "../middleware/loginAuthorization.js";
import userRoles from "../enums/roles.js";
import roleAuthorization from "../middleware/roleAuthorization.js";

const userRouter = Router();

userRouter.get("/users", loginAuthorization , roleAuthorization([userRoles.Admin]) , userController.getAll);
userRouter.get("/user/:id", loginAuthorization ,userController.getOneById);
userRouter.post("/user", loginAuthorization  , roleAuthorization([userRoles.Admin]) , userSchemaValidator ,userController.create);
userRouter.put("/user/:id", loginAuthorization , roleAuthorization([userRoles.Admin]) , userController.update);
userRouter.delete("/user/:id", loginAuthorization , roleAuthorization([userRoles.Admin]) , userController.delete);
userRouter.get("/user/find/:search", loginAuthorization, roleAuthorization([userRoles.Admin,userRoles.User]) ,userController.search);

export default userRouter;