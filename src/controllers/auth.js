import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import  jwt from "jsonwebtoken";

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
                    const token = jwt.sign({user},"asadweacasd23321qeqafasd",{
                        algorithm: "HS256"
                    })
                    console.log(token);
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