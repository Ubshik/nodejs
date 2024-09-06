import users from '../daos/users.js';
import bcrypt from 'bcryptjs';

const getUserByEmail = async(email) => {
    console.log("service: inside getUserByEmail");
    const user = await users.getUserByEmail(email);
    console.log("user: " + user);
    return user;
}

async function hashedPassword(password) {
    const hashPass = await bcrypt.hash(password, 10);
    return hashPass;
}

const createUser = async(userBody) => {
    console.log("service: inside createUser");
    const hashPass = await hashedPassword(userBody.password);
    console.log("pass: " + userBody.password + " -> " + hashPass);
    const newUser = await users.createUser(userBody, hashPass);
    return newUser;
}

//todo
const verifyEmail = async(userEmail) => {
    console.log("service: activate user - user email from localStorage: " + userEmail);
    const user = await users.verifyEmail(userEmail);
    console.log("user after email verification: " + JSON.stringify(user));
    if (!user) {
        return 404;
    }
    return 200;
}

// function deleteUserByIdInLocalStorage(userId) {
//     console.log("service: remove user - userId from localStorage: " + userId);
//     const index = users.getUserIndex(userId);
//     if (index === -1) {
//         return 404;
//     }
//     const deleted = users.deleteUserByIndex(index);
//     return deleted;
// }



export default {
    getUserByEmail,
    createUser,
    verifyEmail
}