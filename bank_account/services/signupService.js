import users from '../daos/users.js';
import bcrypt from 'bcryptjs';

const getUserByEmail = (email) => {
    console.log("service: inside getUserByEmail");
    const user = users.getUserByEmail(email);
    console.log("user:/n" + user);
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
    const newUser = users.createUser(userBody, hashPass);
    return newUser;
}

function activateUser(userId) {
    console.log("service: activate user - userId from localStorage: " + userId);
    const user = users.getUserById(userId);
    const index = users.getUserIndex(userId);
    if (index === -1) {
        return 404;
    }
    user.active = 1;
    users.updateUser(index, user);
    return user;
}

function deleteUserByIdInLocalStorage(userId) {
    console.log("service: remove user - userId from localStorage: " + userId);
    const index = users.getUserIndex(userId);
    if (index === -1) {
        return 404;
    }
    const deleted = users.deleteUserByIndex(index);
    return deleted;
}



export default {
    getUserByEmail,
    createUser,
    activateUser,
    deleteUserByIdInLocalStorage
}