import userDAO from '../daos/userDAO.js';
import bcrypt from 'bcryptjs';

async function hashedPassword(password) {
    const hashPass = await bcrypt.hash(password, 10);
    return hashPass;
}

//amount should be not changable. check random function
const createUser = async(userBody, verificationCode) => {
    console.log("service: inside createUser");
    const hashPass = await hashedPassword(userBody.password);
    console.log("pass: " + userBody.password + " -> " + hashPass);
    const newUser = await userDAO.createUser(userBody.email, userBody.phone, hashPass, verificationCode);
    return newUser;
}

const verifyEmail = async(userEmail) => {
    console.log("service: activate user - user email from localStorage: " + userEmail);
    const status = await userDAO.verifyEmail(userEmail);
    return status;
}

export default {
    createUser,
    verifyEmail
}