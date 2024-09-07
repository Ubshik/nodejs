import userDAO from '../daos/users.js';
import bcrypt from 'bcryptjs';

async function hashedPassword(password) {
    const hashPass = await bcrypt.hash(password, 10);
    return hashPass;
}

const createUser = async(userBody) => {
    console.log("service: inside createUser");
    const hashPass = await hashedPassword(userBody.password);
    console.log("pass: " + userBody.password + " -> " + hashPass);
    const newUser = await userDAO.createUser(userBody, hashPass);
    return newUser;
}

const verifyEmail = async(userEmail) => {
    console.log("service: activate user - user email from localStorage: " + userEmail);
    const user = await userDAO.verifyEmail(userEmail);
    console.log("user after email verification: " + JSON.stringify(user));
    if (!user) {
        return 404;
    }
    return 200;
}

export default {
    createUser,
    verifyEmail
}