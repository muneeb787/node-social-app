import { Router } from "express";
import userRouter from "./users.js";
import postRouter from "./posts.js";

const appRouter = Router();

appRouter.use(userRouter);
appRouter.use(postRouter);

export default appRouter;