import { Router } from "express";
import postController from "../controllers/posts/posts.js";
import postCommentsController from "../controllers/posts/postComments.js";
import postLikesController from "../controllers/posts/postLikes.js";

const postRouter = Router();

postRouter.get("/posts",postController.getAll);
postRouter.get("/post/:id",postController.getOneById);
postRouter.post("/post",postController.create);
postRouter.put("/post/:id",postController.update);
postRouter.delete("/post/:id",postController.delete);

//Commenting on Post
postRouter.post("/post-comment/:postId",postCommentsController.newComment);
postRouter.get("/get-comments/:postId",postCommentsController.getAll);
postRouter.get("/count-comments/:postId",postCommentsController.countComments);
// Like on Post
postRouter.post("/post-like/:postId",postLikesController.likes);
postRouter.get("/get-likes/:postId",postLikesController.getAll);
postRouter.get("/count-likes/:postId",postLikesController.countLikes);
// User All Posts
postRouter.get("/postsByUser/:userId",postController.getAllForOneUser);


export default postRouter;