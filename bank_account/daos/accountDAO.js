import mongoose from 'mongoose';
import accountModel from '../models/accountModel.js';
import transactionModel from '../models/transactionModel.js';
import User from '../models/userModel.js';
import userService from '../services/userService.js';

const getAccountByObjectId = async(id) => {
    console.log("dao: inside getAccountByObjectId");
    const account = await accountModel.Account.findOne({_id: id});
    console.log("account: " + account);
    return account;
}

const doTransaction = async(from, to, amount) => {
    console.log("dao: inside doTransaction");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const createdTransaction = await new transactionModel.Transaction(
            {
                amount: amount,
                from: from,
                to: to
            }).save({session: session});
        
        console.log("createdTransaction: " + createdTransaction);

        const userFrom = await userService.getUserByEmail(from);
        // const userFrom = await User.findOne({email: from}, {}, {session: session});
        console.log("account_id: " + userFrom.account);
        await accountModel.Account.updateOne({_id: userFrom.account}, 
            {   $inc: {balance: -amount},
                $push: {transactions: createdTransaction}}, 
            {session: session});

        const userTo = await userService.getUserByEmail(to);
        // const userTo = await User.findOne({email: to}, {}, {session: session});
        await accountModel.Account.updateOne({_id: userTo.account}, 
            {   $inc: {balance: amount},
                $push: {transactions: createdTransaction._id}}, 
            {session: session});

        await session.commitTransaction();
        console.log("after commit");
        return 200;
    } catch (error) {
        await session.abortTransaction();
        console.log("Transaction is failed: " + error);
        return 500;
    } finally {
        session.endSession();
    }
}

export default {
    doTransaction
}