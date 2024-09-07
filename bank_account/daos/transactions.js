import User from '../models/userModel.js';
import mongoose from 'mongoose';
import transactionSchema from '../models/transactionModel.js';
import userDAO from '../daos/users.js';

const updateBalance = async(email, amount) => {
    console.log("dao: inside update balance");
    const user = await User.updateOne({email: email}, {$inc: {balance: amount}});
    console.log("# updated user: " + user.modifiedCount);
    return user;
}

const createTransactionRecord = async(email, amount, type, addressee) => {
    console.log("dao: inside create transaction record");
    try {
        const transactionModel = mongoose.model('Transaction', transactionSchema, 'transactions');
        const newRecord = new transactionModel({
            amount: amount,
            type: type,
            addressee: addressee
        });
        const user = await User.updateOne({email: email}, {$push: {transactions: newRecord}});

        const updatedUser = await userDAO.getUserByEmail(email);
        console.log("updated user with transaction: " + JSON.stringify(updatedUser));

        console.log("200: Transaction was added");
        return 200;
    } catch (error) {
        console.log("500: Server error: " + error);
        throw new Error("Can not create transaction record " + error); 
    }
}

export default {
    updateBalance,
    createTransactionRecord
}