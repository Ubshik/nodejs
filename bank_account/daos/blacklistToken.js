import BlacklistToken from '../models/blacklistTokenModel.js';

const getBlockedToken = async(token) => {
    console.log("dao: inside isBlockedToken");
    const blockedToken = await BlacklistToken.findOne({token: token});
    return blockedToken;
}

const createBlockedToken = async(token) => {
    console.log("dao: inside createToken");
    try {
        const newBlockedToken = new BlacklistToken({
            token: token
        });

        await newBlockedToken.save();
        console.log("201: Blocked token saved successfully");
        return 201;
    } catch (error) {
        console.log("500: Server error: " + error);
        return 500;
    }
}

export default {
    getBlockedToken,
    createBlockedToken
}