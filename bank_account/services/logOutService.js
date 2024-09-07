import blacklistTokenDAO from '../daos/blacklistToken.js';

const createBlockedToken = async(token) => {
    const blockedToken = await blacklistTokenDAO.createBlockedToken(token); 
    return blockedToken;
}

const isBlockedToken = async(token) => {
    const blockedToken = await blacklistTokenDAO.getBlockedToken(token);
    return blockedToken ? true : false;
}

export default {
    createBlockedToken,
    isBlockedToken
}