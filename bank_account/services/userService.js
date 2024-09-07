import userDAO from '../daos/users.js';

const getUserByEmail = async(email) => {
    console.log("service: inside getUserByEmail");
    const user = await userDAO.getUserByEmail(email);
    return user;
}

export default {
    getUserByEmail
}