import logOutService from '../services/logOutService.js';

const logOut = (async(request, response) => {
    console.log('logOut controller');
    try {
        const token = request.header('Authorization');
        const isBlockedToken = await logOutService.isBlockedToken(token);
        if (isBlockedToken) {
            return response.sendStatus(204);
        }

        await logOutService.createBlockedToken(token);
        response.status(200).json({message: 'User is logged out successful'});
    } catch(error) {
        response.status(500).json({error: 'Server error'});
    }
});


export default {
    logOut
};