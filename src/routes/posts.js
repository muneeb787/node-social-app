import { Router } from "express";
import postController from "../controllers/posts.js";

const postRouter = Router();

postRouter.get("/posts",postController.getAll);
postRouter.get("/post/:id",postController.getOneById);
postRouter.post("/post",postController.create);
postRouter.put("/post/:id",postController.update);
postRouter.delete("/post/:id",postController.delete);

export default postRouter;