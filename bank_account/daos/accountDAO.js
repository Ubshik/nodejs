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

// const putTransactionInAccounts = async(from, to, amount) => {
//     console.log("dao: inside putTransactionInAccount");

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const createdTransaction = await new transactionModel.Transaction({
//             amount: amount,
//             from: from,
//             to: to
//         }).save().session(session);

//         console.log("as flag from transaction: ");
//         console.log("createdTransaction: " + createdTransaction);

//         const userFrom = await userService.getUserByEmail(from).session(session);
//         // console.log("userFrom: " + JSON.stringify(userFrom));
//         // console.log("userFrom.account/_id: " + userFrom.account._id);
//         console.log("UserFrom: balance: " + userFrom.Account.balance + " -amount: " + -amount);
//         await accountModel.Account.updateOne({_id: userFrom.account._id}, 
//             {   $inc: {balance: -amount},
//                 $push: {transactions: createdTransaction}}).session(session);

//         // console.log("before error");
//         // throw new Error('My error for checking');
//         // console.log("after error");

//         const userTo = await userService.getUserByEmail(to).session(session);
//         console.log("UserFrom: balance: " + userFrom.Account.balance + " -amount: " + -amount);
//         await accountModel.Account.updateOne({_id: userTo.account._id}, 
//             {   $inc: {balance: amount},
//                 $push: {transactions: createdTransaction}}).session(session);
        
//         session.commitTransaction();
//         console.log("after commit");
//         return 200;
//     } catch (error) {
//         session.abortTransaction();
//         console.log("Transaction is failed: " + error);
//         return 500;
//     } finally {
//         session.endSession();
//     }
// }

//Transaction doesn't do rollback
// const doTransaction = async(from, to, amount) => {
//     console.log("dao: inside putTransactionInAccount");

//     const session = await mongoose.startSession();
//     session.startTransaction();

//     try {
//         const createdTransaction = await new transactionModel.Transaction({
//             amount: amount,
//             from: from,
//             to: to
//         }).save().session(session);

//         console.log("createdTransaction: " + createdTransaction);

//         const userFrom = await userService.getUserByEmail(from).session(session);
// //todo check + transaction + dashboard
//         await User.updateOne({email: from}, 
//             {$set: {account: await accountModel.Account.updateOne({_id: userFrom.account._id}, 
//                 {   $inc: {balance: -amount},
//                     $push: {transactions: createdTransaction}})
//             }});

//         const userTo = await userService.getUserByEmail(to);

//         await User.updateOne({email: to}, 
//             {$set: {account: await accountModel.Account.updateOne({_id: userTo.account._id}, 
//                 {   $inc: {balance: amount},
//                     $push: {transactions: createdTransaction}})
//             }});



//         // console.log("userFrom: " + JSON.stringify(userFrom));
//         // console.log("userFrom.account_id: " + userFrom.account._id);
//         // const updatedAccountFrom = await accountModel.Account.updateOne({_id: userFrom.account._id}, 
//         //     {   $inc: {balance: -amount},
//         //         $push: {transactions: createdTransaction}});

//         // await User.updateOne({email: from}, 
//         //         {   $set: {account: updatedAccountFrom}});

//         // const userTo = await userService.getUserByEmail(to);
//         // const updatedAccountTo = await accountModel.Account.updateOne({_id: userTo.account._id}, 
//         //     {   $inc: {balance: amount},
//         //         $push: {transactions: createdTransaction}});
//         // await User.updateOne({email: to}, 
//         //         {   $set: {account: updatedAccountTo}});
        
//         session.commitTransaction();
//         return 200;
//     } catch (error) {
//         session.abortTransaction();
//         console.log("Transaction is failed: " + error);
//         return 500;
//     } finally {
//         session.endSession();
//     }
// }


const putTransactionInAccounts = async(from, to, amount) => {
    console.log("dao: inside putTransactionInAccount");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const createdTransaction = await new transactionModel.Transaction({
                        amount: amount,
                        from: from,
                        to: to
                    }).save({session: session});
        
        console.log("as flag from transaction: ");
        console.log("createdTransaction: " + createdTransaction);

        const userFrom = await userService.getUserByEmail(from);
        // const userFrom = await User.findOne({email: from}, {}, {session: session});
        console.log("account_id: " + userFrom.account._id);
        // await accountModel.Account.updateOne({_id: userFrom.account._id}, 
        //     {   $inc: {balance: -amount},
        //         $push: {transactions: createdTransaction}}, 
        //     {session: session});

                await User.updateOne({email: from}, 
            {$set: {account: await accountModel.Account.updateOne({_id: userFrom.account._id}, 
                {   $inc: {balance: -amount},
                    $push: {transactions: createdTransaction}}, {session: session})
            }}, {session: session});

        // console.log("before error");
        // throw new Error('My error for checking');
        // console.log("after error");

        const userTo = await userService.getUserByEmail(to);
        // const userTo = await User.findOne({email: to}, {}, {session: session});
        // await accountModel.Account.updateOne({_id: userTo.account._id}, 
        //     {   $inc: {balance: amount},
        //         $push: {transactions: createdTransaction}}, 
        //     {session: session});

        await User.updateOne({email: to}, 
            {$set: {account: await accountModel.Account.updateOne({_id: userTo.account._id}, 
                {   $inc: {balance: -amount},
                    $push: {transactions: createdTransaction}}, {session: session})
            }}, {session: session});

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
    putTransactionInAccounts,
    // doTransaction
}