import data from '../data.js';

const getUserByEmail = (email) => {
    console.log("dao: inside getUserByEmail");
    const user = data.find(user => user.email === email);
    console.log("user:/n" + user);
    return user;
}

const createUser = (userBody, hashPass) => {
    console.log("dao: inside createUser");
    const length = data.length;
    console.log("start length: " + length);
    const newUser = {
        id: length + 1,
        email: userBody.email,
        phone: userBody.phone,
        password: hashPass,
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

const getUserById = (userId) => {
    console.log('dao: get a user by id=' + userId);
    const user = data.find(user => user.id === userId);
    return user;
}

const getUserIndex = (userId) => {
    console.log('dao: get a user index id=' + userId);
    const index = data.findIndex(user => user.id === userId);
    return index;
}

const updateUser = (index, user) => {
    console.log('dao: update the user');
    data[index] = user;
    return 200;
}

const deleteUserByIndex = (index) => {
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
    getUserById,
    getUserIndex,
    updateUser,
    deleteUserByIndex
}