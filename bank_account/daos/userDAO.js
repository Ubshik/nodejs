import mongoose from "mongoose";
import User from '../models/userModel.js';
import accountModel from '../models/accountModel.js';

const getUserByEmail = async(email) => {
    console.log("dao: inside getUserByEmail");
    const user = await User.findOne({email: email});
    console.log("dao: user is ready");
    // console.log("user: " + user);
    return user;
}

const createUser = async(email, phone, hashPass, verificationCode) => {
    console.log("dao: inside createUser");

    try {
        const newUser = new User({
            email: email,
            phone: phone,
            hashedPassword: hashPass,
            verificationCode: verificationCode,
        });

        await newUser.save();
        console.log("201: User registred successfully");
        return 201;
    } catch (error) {
        console.log("500: Server error: " + error);
        return 500;
    }
}

const verifyEmail = async(email) => {
    console.log("dao: inside verify email");

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        await User.updateOne({email: email}, 
            {$set: {isEmailVerified: true,
                    account: await new accountModel.Account().save()
            }});
        session.commitTransaction();
        console.log("Email verification is successful");
        return 200;
    } catch (error) {
        session.abortTransaction();
        console.log("Email verification is failed: " + error);
        return 500;
    } finally {
        session.endSession();
    }
}

export default {
    getUserByEmail,
    createUser,
    verifyEmail
}