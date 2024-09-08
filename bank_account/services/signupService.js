import userDAO from '../daos/users.js';
import bcrypt from 'bcryptjs';

async function hashedPassword(password) {
    const hashPass = await bcrypt.hash(password, 10);
    return hashPass;
}

function getRandomSixDigits() {
    return Math.floor(100_000 + Math.random() * 900_000);
}

const createUser = async(userBody, verificationCode) => {
    console.log("service: inside createUser");
    const hashPass = await hashedPassword(userBody.password);
    console.log("pass: " + userBody.password + " -> " + hashPass);
    const newUser = await userDAO.createUser(userBody.email, userBody.phone, hashPass, verificationCode);
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