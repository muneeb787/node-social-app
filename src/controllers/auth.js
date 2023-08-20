import userModel from "../models/users.js";
import bcrypt from "bcrypt";

const authController = {
    login: async (req,res)=>{
        try{
            const {email,password} = req.body
            const user = await userModel.findOne({email})
            if(user)
            {
                const checkLogin = await bcrypt.compare(password , user.password )
                if(checkLogin)
                {
                    return res.status(200).json({ success: true, message: "Login Successfully" });
                }
                else
                {
                    return res.status(201).json({ success: true, message: "Invalid Credentials" });

                }

            }
            else
            {
                return res.status(400).json({ success: true, message: "Invalid Credentials" });
            }
        }
        catch(e)
        {
            console.log(e,"getting Error");
        }
    },
}

export default authController