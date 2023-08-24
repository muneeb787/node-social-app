import jwt from "jsonwebtoken"
const loginAuthorization = (req,res,next) => {
    try{
        let header = req.headers.authorization;;
        if (!header) {
            return res.status(401).json({ success: false, message: "Authorization header missing" });
        }
        let token = header.replace("Bearer " , "")
        let decoded = jwt.decode(token)
        req.user = decoded.user;
        next();
    }
    catch(e) 
    {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        } else {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
}

export default loginAuthorization