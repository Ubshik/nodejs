import mongoose from 'mongoose';
import randomFloat from 'random-float';
import roles from '../enums/rolesEnum.js';
import transactionSchema from './transactionModel.js';

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: roles,
        default: 'user',
    },
    creationTime: {
        type: Date,
        default: Date.now,
    },
    balance: {
        type: Number,
        default: randomFloat(0, 150).toFixed(2),
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    transactions: [
        transactionSchema,
    ]
});

userSchema.index(
    {creationTime: 1},
    {expireAfterSeconds: 120, partialFilterExpression: {isEmailVerified: false}},
);

const User = mongoose.model('User', userSchema);

export default User;