import postModel from "../../models/posts.js";


const postController = {
    getAll: async (req, res) => {
        try {

            const users = await postModel.find().populate("user_id")
            return res.status(200).json({ success: true, data: users });
        }
        catch (e) {
            console.log("getting Error");
        }
    },
    getAllForOneUser: async (req, res) => {
        const user_id = req.params.userId
        try {

            const users = await postModel.find();
            // console.log(users);
            users.forEach((elem) => {
                console.log("user --------------------")
                console.log(elem.user_id == user_id)
                console.log(elem.user_id)
                console.log(user_id)
            })
            const sortUsers = users.filter((elem) => elem.user_id == user_id)
            return res.status(200).json({ success: true, data: sortUsers });
        }
        catch (e) {
            console.log("getting Error");
        }
    },
    getOneById: async (req, res) => {
        const id = req.params.id;
        try {
            const post = await postModel.findById(id)
            if (post) {
                return res.status(200).json({ success: true, data: post });
            }
            else {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch (e) {
            return res.status(400).json({ success: false, message: "PostId is Wrong" });
        }
    },
    create: async (req, res) => {
        const { title, description, user_id } = req.body
        console.log(title)
        console.log(description)
        try {
            const post = await postModel.create({ title, description, user_id })
            if (post) {
                return res.status(200).json({ success: true, message: "Post Posted Successfully" });
            }
            else {
                return res.status(400).json({ success: false, message: "Post Posting Error" });
            }
        }
        catch (e) {
            console.log(e, "error")
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const post = await postModel.findByIdAndUpdate(id, data)
            if (post) {
                return res.status(200).json({ success: true, message: "Post Updated Successfully", data: post });
            }
            else {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch (e) {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await postModel.findByIdAndRemove(id)
            if (post) {
                return res.status(200).json({ success: true, message: "Post Deleted Successfully", data: post });
            }
            else {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch (e) {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
}

export default postController