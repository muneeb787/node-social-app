const roleAuthorization = (req, res, next) => {
    try {
        const role = req.user.role;
        console.log(role)
        if (!role || role !== "admin") {
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
