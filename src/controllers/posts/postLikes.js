import postModel from "../../models/posts.js";


const postLikesController = {
    getAll: async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await postModel.findById(postId)
            if (!post) {
                return res.status(400).json({ success: false, message: "No Likes" });
            }
            return res.status(200).json({ success: true, data: post.likes });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    countLikes: async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await postModel.findById(postId);
            if (!post) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, data: post.likes.length });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    likes: async (req, res) => {
        try {
            const { postId } = req.params;
            const { user_id } = req.body;
    
            const post = await postModel.findById(postId);
            if (!post) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
    
            const likeIndex = post.likes.findIndex((elem) => elem.user_id == user_id);
    
            if (likeIndex !== -1) {
                post.likes.splice(likeIndex, 1);
                await post.save();
                return res.status(200).json({ success: true, message: "UnLiked Successfully" });
            } else {
                post.likes.push({ user_id });
                await post.save();
                return res.status(200).json({ success: true, message: "Liked Successfully" });
            }
        } catch (e) {
            console.error(e);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    
}

export default postLikesController