import userDAO from '../daos/userDAO.js';

const getUserByEmail = async(email) => {
    console.log("service: inside getUserByEmail");
    const user = await userDAO.getUserByEmail(email);
    return user;
}

const getUserWithDataAboutAccount = async(email) => {
    console.log("service: inside getUserWithDataAboutAccount");
    const user = await userDAO.getUserByEmailWithAllCorrespondData(email);
    return user;
}

export default {
    getUserByEmail,
    getUserWithDataAboutAccount
}