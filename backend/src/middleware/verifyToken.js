import jwt from "jsonwebtoken"

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers.authorization
        
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }
        
        const decoded = jwt.verify(token, "key");
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
}

export {
    verifyToken
}