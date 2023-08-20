import postModel from "../models/posts.js";


const postController = {
    getAll: async (req,res)=>{
        try{

            const users = await postModel.find().populate("user_id")
            return res.status(200).json({ success: true, data: users });
        }
        catch(e)
        {
            console.log("getting Error");
        }
    },
    getOneById: async (req,res)=>{
        const id = req.params.id;
        try{
            const user = await postModel.findById(id).populate("user_id")
            console.log(id)
            console.log(user)
            if(user)
            {
                return res.status(200).json({ success: true, data: user });
            }
            else
            {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch(e)
        {
            return res.status(400).json({ success: false, message: "UserId is Wrong" });
        }
    },
    create: async (req,res)=>{
        const {title,description,user_id} = req.body
        console.log(title)
        console.log(description)
        try{
            const user = await postModel.create({title,description,user_id})
            if(user)
            {
                return res.status(200).json({ success: true, message: "Post Posted Successfully" });
            }
            else
            {
                return res.status(400).json({ success: false, message: "Post Posting Error" });
            }
        }
        catch(e)
        {
            console.log(e,"error")
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    update: async (req,res)=>{
        const id = req.params.id;
        const data = req.body;
        try{
            const user = await postModel.findByIdAndUpdate(id,data)
            if(user)
            {
                return res.status(200).json({ success: true, message: "Post Updated Successfully", data: user });
            }
            else
            {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch(e)
        {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    delete: async (req,res)=>{
        const id = req.params.id;
        try{
            const user = await postModel.findByIdAndRemove(id)
            if(user)
            {
                return res.status(200).json({ success: true, message: "Post Deleted Successfully", data: user });
            }
            else
            {
                return res.status(400).json({ success: false, message: "No Post Found" });
            }
        }
        catch(e)
        {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
}

export default postController