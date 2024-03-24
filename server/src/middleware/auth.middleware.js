import jwt from 'jsonwebtoken';
import {config} from 'dotenv';
config();

export const authProtect = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.replace('Bearer ',"");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: No token provided',
            });
        }

        const decoded = jwt.verify(token, process.env.ACESS_TOKEN_SECRET);
       
        if (!decoded) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Invalid token',
            });
        }
        req.user = decoded;

        next();
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: 'Internal Error',
        })
    }
}