import mongoose from 'mongoose';
import transactionModel from './transactionModel.js';

const accountSchema = new mongoose.Schema({
    balance: {
        type: Number,
        default: () => Math.floor(Math.random() * 150 * 100),
    },
    transactions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Transaction',
        }
    ]
});

const Account = mongoose.model('Account', accountSchema);

export default {
    accountSchema,
    Account
};