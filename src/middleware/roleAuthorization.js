const roleAuthorization = (roles) => (req , res, next) => {
    try {
        const role = req.user.role;
        const checkRoles = roles.findIndex((elem)=>elem == role);
        if (checkRoles == -1) {
            return res.status(401).json({ success: false, message: "Unauthorized" });
        }
        next();
    } catch (e) {
        if (e.name === "TokenExpiredError") {
            return res.status(401).json({ success: false, message: "Token expired" });
        } else if (e.name === "JsonWebTokenError") {
            return res.status(401).json({ success: false, message: "Invalid token" });
        } else {
            return res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    }
};

export default roleAuthorization;
