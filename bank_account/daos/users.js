import User from '../models/userModel.js';

const getUserByEmail = async(email) => {
    console.log("dao: inside getUserByEmail");
    const user = await User.findOne({email: email});
    console.log("user:/n" + user);
    return user;
}

const createUser = async(userBody, hashPass) => {
    console.log("dao: inside createUser");
    try {
        const newUser = new User({
            email: userBody.email,
            phone: userBody.phone,
            hashedPassword: hashPass
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
    const user = await User.updateOne({email: email}, {$set: {isEmailVerified: true}});
    console.log("user: " + user);
    return user;
}

export default {
    getUserByEmail,
    createUser,
    verifyEmail
}