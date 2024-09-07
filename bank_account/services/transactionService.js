import mongoose from "mongoose";
import transactions from "../daos/transactions.js";

const doTransaction = async(sender, receiver, amount) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await transactions.createTransactionRecord(sender, amount, 'minus', receiver);
        await transactions.createTransactionRecord(receiver, amount, 'plus', sender);
        await transactions.updateBalance(sender, -amount);
        await transactions.updateBalance(receiver, amount);
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