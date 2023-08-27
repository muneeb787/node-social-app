import userModel from "../models/users.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import loginEmail from "../emails/auth/login.mail.js";
import otpModel from "../models/otp.js";
import otpEmail from "../emails/auth/otpEmail.js";
import { text } from "express";

function otpGenerator() {
    let otp = "";
    const digits = "0123456789";
    for (let i = 0; i < 4; i++) {
        const randomIndex = Math.floor(Math.random() * 10); // Use 10 instead of 9
        otp += digits[randomIndex];
    }
    return otp;
}

const authController = {
    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email });
            if (user) {
                const checkLogin = await bcrypt.compare(password, user.password);
                console.log(checkLogin)
                if (checkLogin) {
                    const token = jwt.sign({ user }, process.env.TOKEN_SECRET_KEY, {
                        algorithm: process.env.JWT_ALGO_TYPE,
                    });
                    console.log(token);
                    loginEmail(user);
                    return res
                        .status(200)
                        .json({
                            success: true,
                            message: "Login Successfully",
                            token: token,
                        });
                } else {
                    return res
                        .status(201)
                        .json({ success: true, message: "Invalid Credentials" });
                }
            } else {
                return res
                    .status(400)
                    .json({ success: true, message: "Invalid Credentials" });
            }
        } catch (e) {
            console.log(e, "getting Error");
        }
    },
    forgetPassword: async (req, res) => {
        try {
            const { email } = req.body;
            const otp = otpGenerator();
            const otpPost = await otpModel.create({ email, otp })
            if (!otpPost) {
                return res.status(400).json({ success: false, message: "Error in Generating OTP , Please Try Later" });
            }

            otpEmail({email: email , otp: otp})
            return res.status(200).json({ success: true, message: "Enter Your OTP to reset your password" });
        }
        catch (e) {
            console.log(e)

            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    checkOtp: async (req, res) => {
        try {
            const { email, otp } = req.body;
            const findUser = await otpModel.findOne({ email }).sort('-createdAt');
            if (!findUser) {
                return res.status(400).json({ success: false, message: "Error in Generating OTP , Please Try Later" });
            }
            const creationTime = findUser.createdAt;
            const currentTime = Date.now();
            const TimeDifference = Math.abs(creationTime - currentTime)
            const fiveMinutes = 5 * 60 * 1000;
            if (findUser.otp != otp) {
                return res.status(400).json({ success: false, message: "Wrong OTP" });
            } else if (TimeDifference > fiveMinutes) {
                return res.status(400).json({ success: false, message: "OTP Expires" });

            }
            return res.status(200).json({ success: true, message: "OTP is correct! Change Your Password" });
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    },
    regenerateOtp:async (req,res) => {
        try {
            const { email } = req.body;
            const otp = otpGenerator();
            const otpPost = await otpModel.create({ email, otp })
            if (!otpPost) {
                return res.status(400).json({ success: false, message: "Error in Generating OTP , Please Try Later" });
            }
            return res.status(200).json({ success: true, message: "OTP Regenerated" });
        }
        catch (e) {
            console.log(e)
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
};

export default authController;
