import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const isMatchedPassword = async (providedPassword, hashedPass) => {
    console.log("inside loginService");
    const passwordMatch = await bcrypt.compare(providedPassword, hashedPass);
    return passwordMatch;
}

const getToken = (email) => {
    const token = jwt.sign({email: email}, process.env.JWT_SECRET, {
        expiresIn: '2h' //5m - 5 minutes; 2h - 2 hours
    });
    return token;
}

export default {
    isMatchedPassword,
    getToken
}