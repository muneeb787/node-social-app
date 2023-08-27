import usersModel from "../models/users.js";
import bcrypt from "bcrypt";

const userController = {
    getAll: async (req, res) => {
        try {
            const users = await usersModel.find()
            if (!users) {
                return res.status(400).json({ success: false, message: "No Users Found" });
            }
            return res.status(200).json({ success: true, data: users });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    getOneById: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await usersModel.findById(id)
            if (!user) {
                return res.status(400).json({ success: false, message: "No User Found" });
            }
            return res.status(200).json({ success: true, data: user });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    create: async (req, res) => {
        try {
            const { name, email, password, role } = req.body
            const hashPassword = await bcrypt.hash(password, 12)
            const user = await usersModel.create({ name, email, password: hashPassword , role })
            if (!user) {
                return res.status(400).json({ success: false, message: "User Not Created" });
            }
            return res.status(200).json({ success: true, message: "User Created Successfully" });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    update: async (req, res) => {
        const id = req.params.id;
        const data = req.body;
        try {
            const user = await usersModel.findByIdAndUpdate(id, data)
            if (!user) {
                return res.status(400).json({ success: false, message: "No User Found" });
            }
            return res.status(200).json({ success: true, message: "Data Updated Successfully", data: user });
        }
        catch (e) {
            return res.status(400).json({ success: false, message: "Something Went Wrong" });
        }
    },
    delete: async (req, res) => {
        const id = req.params.id;
        try {
            const user = await usersModel.findByIdAndRemove(id)
            if (!user) {
                return res.status(400).json({ success: false, message: "No User Found" });
            }
            return res.status(200).json({ success: true, message: "Data Deleted Successfully", data: user });
        }
        catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    search: async (req, res) => {
        try {
            const search = req.params.search;
            const searched = await usersModel.find(
                {
                    $or: [
                        { name: new RegExp(search, "i") },
                        { email: new RegExp(search, "i") },
                    ],
                });

                return res.status(200).json({ success: true, data: searched });
        } catch (e) {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default userController