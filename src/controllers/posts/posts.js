import postModel from "../../models/posts.js";


const postController = {
    getAll: async (req, res) => {
        try {

            const posts = await postModel.find().populate("user_id")
            if (!posts) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, data: posts });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    getAllForOneUser: async (req, res) => {
        try {
            const user_id = req.params.userId
            const posts = await postModel.find({ user_id })
            if (!posts) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, data: posts });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    getOneById: async (req, res) => {
        try {
            const id = req.params.id;
            const post = await postModel.findById(id)
            if (!post) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, data: post });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    create: async (req, res) => {
        try {
            const { title, description, user_id } = req.body
            const post = await postModel.create({ title, description, user_id })
            if (!post) {
                return res.status(400).json({ success: false, message: "Post Posting Error" });
            }
            return res.status(200).json({ success: true, message: "Post Successfully" });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const post = await postModel.findByIdAndUpdate(id, data)
            if (!post) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, message: "Post Updated Successfully" });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await postModel.findByIdAndRemove(id)
            if (!post) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, message: "Post Deleted Successfully", data: post });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
}

export default postController