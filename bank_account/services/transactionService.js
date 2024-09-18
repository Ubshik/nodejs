import accountDAO from "../daos/accountDAO.js";

const doTransaction = async(sender, receiver, amount) => {
    const status = accountDAO.putTransactionInAccounts(sender, receiver, Math.floor(amount * 100));
    return status;
}

export default {
    doTransaction
}