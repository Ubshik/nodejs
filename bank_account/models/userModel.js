import mongoose from 'mongoose';
import roles from '../enums/rolesEnum.js';
import accountModel from './accountModel.js';

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
    verificationCode: {
        type: Number,
        required: true,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    account: accountModel.accountSchema
});

userSchema.index(
    {creationTime: 1},
    {expireAfterSeconds: 120, partialFilterExpression: {isEmailVerified: false}},
);

const User = mongoose.model('User', userSchema);

export default User;