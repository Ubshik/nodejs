import data from '../data.js';
import bcrypt from 'bcryptjs';

const getUserByEmail = (email) => {
    console.log("inside getUserByEmail");
    const user = data.find(user => user.email === email);
    console.log("user:/n" + user);
    return user;
}

function hashedPassword(password) {
    bcrypt.hash(password, 10);
}

const createUser = (userBody) => {
    console.log("inside createUser");
    const length = data.length;
    console.log("start length: " + length);
    const newUser = {
        id: length + 1,
        email: userBody.email,
        phone: userBody.phone,
        password: hashedPassword(userBody.password),
        active: 0
    }
    data.push(newUser);
    if (data.length === length) {
        console.log("create user function: return 500");
        return 500;
    } else {
        console.log("create user function: return created user");
        return newUser;
    }
}

function activateUser(userId) {
    console.log("activate user - userId from localStorage: " + userId);
    const user = data.find(user => user.id === userId);
    const index = data.findIndex(user => user.id === userId);
    if (index === -1) {
        return 404;
    }
    user.active = 1;
    data[index] = user;
    return user;
}

function deleteUserByIdInLocalStorage(userId) {
    console.log("remove user - userId from localStorage: " + userId);
    const index = data.findIndex(user => user.id === userId);
    if (index === -1) {
        return 404;
    }
    const startLength = data.length;
    data.splice(index, 1);
    if (startLength == data.length) {
        return 500;
    } else {
        return 200;
    }
}



export default {
    getUserByEmail,
    createUser,
    activateUser,
    deleteUserByIdInLocalStorage
}