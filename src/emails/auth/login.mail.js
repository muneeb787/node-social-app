import Transport from "../../config/nodemailer.js";

const loginEmail = () => {
    Transport.sendMail({
        from: "muneebahmad1268@gmail.com",
        to: "test@test.com",
        subject: "Email Testing",
        text: "This is my first Email"
    }, (err, res) => {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log(res)
        }
    }
    )
}


export default loginEmail;