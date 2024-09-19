import userDAO from '../daos/userDAO.js';

const getUserDTO = async(email) => {
    const user = await userDAO.getUserByEmailWithAllCorrespondData(email);
    const userDTO = {
        email: user.email,
        balance: (user.account.balance / 100),
        transactions: user.account.transactions
    };
    return userDTO;
}

export default {
    getUserDTO
}