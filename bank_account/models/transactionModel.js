import mongoose from 'mongoose';
import transactionTypes from '../enums/transactionTypeEnum.js';

const transactionSchema = new mongoose.Schema({
    amount: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        enum: transactionTypes,
        required: true,
    },
    creationTime: {
        type: Date,
        // default: Date.now,
    },
    addressee: {
        type: String,
        required: true,
    }
});

// const Transaction = mongoose.model('Transaction', transactionSchema);

export default transactionSchema;