import Transport from "../../config/nodemailer.js";

const otpEmail = ({email,otp}) => {
    Transport.sendMail({
        from: "muneebahmad1268@gmail.com",
        to: email,
        subject: "OTP",
        text: `Welcome ${otp}`, 
        // html: emailTemp()
    }, (err, res) => {
        if (err) {
            console.log(err)
        }
        else {
            console.log(res)
        }
    }
    )
}


export default otpEmail;