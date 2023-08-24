import nodemailer from "nodemailer"
let Transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "45a962115b11cf",
        pass: "6cf5062a05e618"
    }
});

export default Transport;