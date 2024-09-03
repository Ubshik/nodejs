import users from '../daos/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const isMatchedPassword = async (providedPassword, hashedPass) => {
    const passwordMatch = await bcrypt.compare(providedPassword, hashedPass);
    return passwordMatch;
}

const getToken = (email) => {
    const token = jwt.sign({email: email}, 'secret', {
        expiresIn: '5m' //5 minutes
    });
    return token;
}

export default {
    isMatchedPassword,
    getToken
}