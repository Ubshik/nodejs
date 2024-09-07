import mongoose from "mongoose";
import transactionDAO from "../daos/transactions.js";

const doTransaction = async(sender, receiver, amount) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await transactionDAO.createTransactionRecord(sender, amount, 'minus', receiver);
        await transactionDAO.createTransactionRecord(receiver, amount, 'plus', sender);
        await transactionDAO.updateBalance(sender, -amount);
        await transactionDAO.updateBalance(receiver, amount);
        console.log("Transaction is successfull");
        return 200;
    } catch (error) {
        session.abortTransaction();
        console.log("Transaction is failed");
        return 500;
    } finally {
        session.endSession();
    }
}

export default {
    doTransaction
}