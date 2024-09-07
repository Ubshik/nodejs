import jwt from 'jsonwebtoken';
import logOutService from '../services/logOutService.js';
import dotenv from 'dotenv';

dotenv.config();

const verifyToken = async(request, response, next) => {
    let token = request.header('Authorization');
    token = token.replace("Bearer ", "");
    console.log("token: " + token);

    const isBlockedToken = await logOutService.isBlockedToken(token);
    console.log("isBlockedToken: " + isBlockedToken);

    if (!token || isBlockedToken) {
        console.log("problem with token");
        return response.status(401).json({error: "Unauthorized access"});
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
            return response.status(401).json({error: "Unauthorized access"});
        }
        request.email = decoded.email;
        console.log("email from token: " + decoded.email);
        next();
    });
}

export default {
    verifyToken
}