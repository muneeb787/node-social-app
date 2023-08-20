import usersModel from "../models/users.js";
import bcrypt from "bcrypt";

const userController = {
    getAll: async (req,res)=>{
        try{

            const users = await usersModel.find()
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
            const user = await usersModel.findById(id)
            if(user)
            {
                return res.status(200).json({ success: true, data: user });
            }
            else
            {
                return res.status(400).json({ success: false, message: "No User Found" });
            }
        }
        catch(e)
        {
            return res.status(400).json({ success: false, message: "UserId is Wrong" });
        }
    },
    create: async (req,res)=>{
        const {name,email,password} = req.body
        const hashPassword = await bcrypt.hash(password, 12)
        console.log(hashPassword);
        try{
            const user = await usersModel.create({name,email,password: hashPassword})
            if(user)
            {
                return res.status(200).json({ success: true, message: "User Created Successfully" });
            }
            else
            {
                return res.status(400).json({ success: false, message: "User Creation Error" });
            }
        }
        catch(e)
        {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    update: async (req,res)=>{
        const id = req.params.id;
        const data = req.body;
        try{
            const user = await usersModel.findByIdAndUpdate(id,data)
            if(user)
            {
                return res.status(200).json({ success: true, message: "Data Updated Successfully", data: user });
            }
            else
            {
                return res.status(400).json({ success: false, message: "No User Found" });
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
            const user = await usersModel.findByIdAndRemove(id)
            if(user)
            {
                return res.status(200).json({ success: true, message: "Data Deleted Successfully", data: user });
            }
            else
            {
                return res.status(400).json({ success: false, message: "No User Found" });
            }
        }
        catch(e)
        {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
}

export default userController