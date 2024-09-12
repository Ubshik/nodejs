import mongoose from 'mongoose';
import accountModel from '../models/accountModel.js';
import transactionModel from '../models/transactionModel.js';
import User from '../models/userModel.js';
import userService from '../services/userService.js';

const getAccountByObjectId = async(id) => {
    console.log("dao: inside getAccountByObjectId");
    const account = await accountModel.Account.findOne({_id: id});
    console.log("account: " + account);
    return user;
}

const putTransactionInAccounts = async(from, to, amount) => {
    console.log("dao: inside putTransactionInAccount");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const createdTransaction = await new transactionModel.Transaction({
            amount: amount,
            from: from,
            to: to
        }).save();

        console.log("createdTransaction: " + createdTransaction);

        const userFrom = await userService.getUserByEmail(from);
        console.log("userFrom: " + JSON.stringify(userFrom));
        console.log("userFrom.account/_id: " + userFrom.account._id);
        await accountModel.Account.updateOne({_id: userFrom.account._id}, 
            {   $inc: {balance: -amount},
                $push: {transactions: createdTransaction}});

        const userTo = await userService.getUserByEmail(to);
        await accountModel.Account.updateOne({_id: userTo.account._id}, 
            {   $inc: {balance: amount},
                $push: {transactions: createdTransaction}});
        
        session.commitTransaction();
        return 200;
    } catch (error) {
        session.abortTransaction();
        console.log("Transaction is failed: " + error);
        return 500;
    } finally {
        session.endSession();
    }
}

//Transaction doesn't do rollback
const doTransaction = async(from, to, amount) => {
    console.log("dao: inside putTransactionInAccount");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const createdTransaction = await new transactionModel.Transaction({
            amount: amount,
            from: from,
            to: to
        }).save();

        console.log("createdTransaction: " + createdTransaction);

        const userFrom = await userService.getUserByEmail(from);
//todo check + transaction + dashboard + random balance
        await User.updateOne({email: from}, 
            {$set: {account: await accountModel.Account.updateOne({_id: userFrom.account._id}, 
                {   $inc: {balance: -amount},
                    $push: {transactions: createdTransaction}})
            }});

        const userTo = await userService.getUserByEmail(to);

        await User.updateOne({email: to}, 
            {$set: {account: await accountModel.Account.updateOne({_id: userTo.account._id}, 
                {   $inc: {balance: amount},
                    $push: {transactions: createdTransaction}})
            }});



        // console.log("userFrom: " + JSON.stringify(userFrom));
        // console.log("userFrom.account_id: " + userFrom.account._id);
        // const updatedAccountFrom = await accountModel.Account.updateOne({_id: userFrom.account._id}, 
        //     {   $inc: {balance: -amount},
        //         $push: {transactions: createdTransaction}});

        // await User.updateOne({email: from}, 
        //         {   $set: {account: updatedAccountFrom}});

        // const userTo = await userService.getUserByEmail(to);
        // const updatedAccountTo = await accountModel.Account.updateOne({_id: userTo.account._id}, 
        //     {   $inc: {balance: amount},
        //         $push: {transactions: createdTransaction}});
        // await User.updateOne({email: to}, 
        //         {   $set: {account: updatedAccountTo}});
        
        session.commitTransaction();
        return 200;
    } catch (error) {
        session.abortTransaction();
        console.log("Transaction is failed: " + error);
        return 500;
    } finally {
        session.endSession();
    }
}

export default {
    putTransactionInAccounts,
    doTransaction
}