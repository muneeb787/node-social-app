import { populate } from "dotenv";
import postModel from "../../models/posts.js";

const postController = {
    getAll: async (req, res) => {
        try {
            console.log(req.user);
            const { perPage, limit } = req.params;
            const posts = await postModel
                .find()
                .sort("-createdAt")
                .skip(limit * (perPage - 1))
                .limit(limit)
                .populate("user_id", "-password");
            if (!posts) {
                return res.status(httpStatusCodes.Bad_Request.code).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ size: posts.length, success: true, data: posts });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    getAllForOneUserByEmail: async (req, res) => {
        try {
            const email = req.params.email;

            const posts = await postModel.aggregate([
                {
                    $lookup: {
                        from: "users",
                        localField: "user_id",
                        foreignField: "_id",
                        as: "user",
                    },
                },
                {
                    $match: {
                        "user.email": email,
                    },
                },
                {
                    $project: {
                        "user.password": 0,
                    },
                },
            ]);

            console.log(posts);

            if (!posts || posts.length === 0) {
                return res.status(400).json({ success: false, message: "No Posts Found" });
            }

            return res.status(200).json({ success: true, data: posts });
        } catch (e) {
            console.log(e);
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },

    getAllForOneUser: async (req, res) => {
        try {
            const user_id = req.params.userId;
            const posts = await postModel.find({ user_id });
            if (!posts) {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, data: posts });
        } catch (e) {
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    },
    getOneById: async (req, res) => {
        try {
            const id = req.params.id;
            const post = await postModel.findById(id);
            if (!post) {
                return res
                    .status(400)
                    .json({ success: false, message: "No Post Found" });
            }
            return res.status(200).json({ success: true, data: post });
        } catch (e) {
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    },
    create: async (req, res) => {
        try {
            const { title, description} = req.body;
            const user_id = req.user._id;
            const post = await postModel.create({ title, description, user_id });
            if (!post) {
                return res
                    .status(400)
                    .json({ success: false, message: "Post Posting Error" });
            }
            return res
                .status(200)
                .json({ success: true, message: "Post Successfully" });
        } catch (e) {
            console.log(e)
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    },
    update: async (req, res) => {
        try {
            const id = req.params.id;
            const data = req.body;
            const post = await postModel.findByIdAndUpdate(id, data);
            if (!post) {
                return res
                    .status(400)
                    .json({ success: false, message: "No Post Found" });
            }
            return res
                .status(200)
                .json({ success: true, message: "Post Updated Successfully" });
        } catch (e) {
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    },
    delete: async (req, res) => {
        try {
            const id = req.params.id;
            const user = await postModel.findByIdAndRemove(id);
            if (!post) {
                return res
                    .status(400)
                    .json({ success: false, message: "No Post Found" });
            }
            return res
                .status(200)
                .json({
                    success: true,
                    message: "Post Deleted Successfully",
                    data: post,
                });
        } catch (e) {
            return res
                .status(500)
                .json({ success: false, message: "Internal Server Error" });
        }
    },
    postFind: async (req, res) => {
        try {
            const search = req.params.search;
            const searched = await postModel.find(
                {
                    $or: [
                        { title: new RegExp(search, "i") },
                        { description: new RegExp(search, "i") },
                    ],
                })

            return res.json(searched);
        } catch (e) {
            console.log(e);
        }
    },
};

export default postController;
