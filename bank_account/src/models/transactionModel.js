import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    from: {
        type: String,
        required: true,
    },
    to: {
        type: String,
        required: true,
    },
    creationTime: {
        type: Date,
        default: Date.now,
    }
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default {
    transactionSchema,
    Transaction
};