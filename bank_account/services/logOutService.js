import blacklistToken from '../daos/blacklistToken.js';

const createBlockedToken = async(token) => {
    const blockedToken = await blacklistToken.createBlockedToken(token); 
    return blockedToken;
}

const isBlockedToken = async(token) => {
    const blockedToken = await blacklistToken.getBlockedToken(token);
    return blockedToken ? true : false;
}

export default {
    createBlockedToken,
    isBlockedToken
}