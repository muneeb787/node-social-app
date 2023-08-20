import postModel from "../../models/posts.js";


const postLikesController = {
    getAll: async (req, res) => {
        const { postId } = req.params;
        try {
            const post = await postModel.findById(postId);
            if (post) {
                const likes = await post.likes;
                if (likes) {

                    return res.status(200).json({ success: true, data: likes });
                }
                else {
                    return res.status(400).json({ success: false, message: "Liking Error" });

                }

            }
            else {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch (e) {
            console.log(e, "error")
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    countLikes: async (req, res) => {
        const { postId } = req.params;
        try {
            const post = await postModel.findById(postId);
            if (post) {
                const likes = await post.likes.length;
                if (likes) {

                    return res.status(200).json({ success: true, data: likes });
                }
                else {
                    return res.status(400).json({ success: false, message: "Likes Error" });

                }

            }
            else {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch (e) {
            console.log(e, "error")
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    likes: async (req, res) => {
        const { postId } = req.params;
        const { user_id } = req.body
        console.log(user_id);
        try {
            const post = await postModel.findById(postId);
            if (post) {
                console.log(post.likes)
                const like = post.likes.find((elem) => elem.user_id == user_id)
                console.log(like, "likes");
                if (like) {
                    const likeIndex = post.likes.findIndex((elem) => elem.user_id == user_id)
                    const commentStatus = await post.likes.splice(likeIndex,1)
                    if (commentStatus) {
                        post.save().then(() => {
                            return res.status(200).json({ success: true, message: "UnLiked Successfully" });
                        });
                    }
                    else {
                        return res.status(400).json({ success: false, message: "UnLiking Error" });

                    }
                }
                else {
                    const commentStatus = await post.likes.push({ user_id })
                    if (commentStatus) {
                        post.save().then(() => {
                            return res.status(200).json({ success: true, message: "Liked Successfully" });
                        });
                    }
                    else {
                        return res.status(400).json({ success: false, message: "Liking Error" });

                    }

                }

            }
            else {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch (e) {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    }
}

export default postLikesController