import { Router } from "express";
import userRouter from "./users.js";
import postRouter from "./posts.js";
import authRouter from "./auth.js";

const appRouter = Router();

appRouter.use(userRouter);
appRouter.use(postRouter);
appRouter.use(authRouter);


export default appRouter;