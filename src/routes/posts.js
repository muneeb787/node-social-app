import { Router } from "express";
import postController from "../controllers/posts/posts.js";
import postCommentsController from "../controllers/posts/postComments.js";
import postLikesController from "../controllers/posts/postLikes.js";
import loginAuthorization from "../middleware/loginAuthorization.js";
import roleAuthorization from "../middleware/roleAuthorization.js";
import postSchemaValidator from "../validators/postValidation.js";
import userRoles from "../enums/roles.js"

const postRouter = Router();

postRouter.get("/posts/:perPage/:limit", loginAuthorization , roleAuthorization([userRoles.Admin]) ,postController.getAll);
postRouter.get("/post/:id" , loginAuthorization ,postController.getOneById);
postRouter.post("/post" , loginAuthorization  , postSchemaValidator ,postController.create);
postRouter.put("/post/:id" , loginAuthorization ,postController.update);
postRouter.delete("/post/:id" , loginAuthorization ,postController.delete);

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
postRouter.get("/postsByUserByEmail/:email",postController.getAllForOneUserByEmail);
// Find Post 
postRouter.get("/posts/:search",postController.postFind);
postRouter.get("/recent-posts",postController.recentPostFind);


export default postRouter;