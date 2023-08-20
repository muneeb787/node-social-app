import postModel from "../../models/posts.js";


const postCommentsController = {
    getAll: async (req, res) => {
        try {
            const { postId } = req.params;
            const post = await postModel.findById(postId);
            if (!post) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            const comments = await post.comments;
            if (comments) {
                return res.status(200).json({ success: true, data: comments });
            }
            else {
                return res.status(400).json({ success: false, message: "No Comments Found" });
            }
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    countComments: async (req, res) => {
        const { postId } = req.params;
        try {
            const post = await postModel.findById(postId);
            if (!post) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, data: post.comments.length });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    newComment: async (req, res) => {
        try {
            const { postId } = req.params;
            const { user_id, commentBody } = req.body;
    
            const post = await postModel.findById(postId);
            if (!post) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
    
            post.comments.push({ user_id, commentBody });
            await post.save();
    
            return res.status(200).json({ success: true, message: "Commented Successfully" });
        } catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
    
}

export default postCommentsController