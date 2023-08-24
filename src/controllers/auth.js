import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";
import loginEmail from "../emails/auth/login.mail.js";

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
                    const token = jwt.sign({user},process.env.TOKEN_SECRET_KEY,{
                        algorithm: process.env.JWT_ALGO_TYPE
                    })
                    console.log(token);
                    loginEmail();
                    return res.status(200).json({ success: true, message: "Login Successfully" , token: token });
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