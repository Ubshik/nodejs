import userDAO from '../daos/userDAO.js';

function convertDateToString(date) {
    const myDate = new Date(date);
    const dateString = ("0" + myDate.getDate()).slice(-2) + "-" 
        + ("0"+(myDate.getMonth()+1)).slice(-2) + "-" 
        + myDate.getFullYear() + " " 
        + ("0" + myDate.getHours()).slice(-2) + ":" 
        + ("0" + myDate.getMinutes()).slice(-2) + ":"
        + ("0" + myDate.getSeconds()).slice(-2);
    return dateString;
}

const getUserDTO = async(email) => {
    const user = await userDAO.getUserByEmailWithAllCorrespondData(email);

    let transactions = user.account.transactions;
    transactions.sort(function(a,b){
        return new Date(b.creationTime) - new Date(a.creationTime);
      });

    let transactionsDTO = [];
    transactions.forEach(element => {
        let elemwntDTO = {
            creationTime: convertDateToString(element.creationTime),
            amount: element.amount / 100,
            from: element.from,
            to: element.to
        };
        transactionsDTO.push(elemwntDTO);
    });

    const userDTO = {
        email: user.email,
        balance: (user.account.balance / 100),
        // transactions: transactionsDTO
        transactions: JSON.stringify(transactionsDTO)
    };

    return JSON.stringify(userDTO);
}

export default {
    getUserDTO
}