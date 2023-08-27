import { Router } from "express";
import authController from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/user/login",authController.login);
authRouter.post("/user/forgetPassword",authController.forgetPassword);
authRouter.post("/user/forgetPassword/otp",authController.checkOtp);
authRouter.post("/user/forgetPassword/regenerateOtp",authController.regenerateOtp);

export default authRouter;