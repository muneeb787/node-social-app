import { Router } from "express";
import userRouter from "./users.js";

const appRouter = Router();

appRouter.use(userRouter);

export default appRouter;