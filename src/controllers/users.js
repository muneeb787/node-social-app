import usersModel from "../models/users.js";

const userController = {
    getAll: (req,res)=>{
        const users = usersModel.find();
        return res.json(users);
    }
}

export default userController