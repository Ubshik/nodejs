import userService from '../services/userService.js';
import logInService from '../services/logInService.js';

const logIn = (async(request, response) => {
    console.log('========== login controller ==========');
    try {
        const user = await userService.getUserByEmail(request.body.email);
        console.log('logIn: user is ');
        if (!user) {
            return response.status(401).json({error: 'Invalid credentials'});
        }
    
        const isMatchedPass = await logInService.isMatchedPassword(request.body.password, user.hashedPassword);
        console.log('logIn: password is matched ' + isMatchedPass);
        if (!isMatchedPass) {
            return response.status(401).json({error: 'Invalid credentials'});
        }
        console.log("user email from request body: " + request.body.email);
        const token = logInService.getToken(request.body.email);
        return response.status(200).json({token: token});
    } catch(error) {
        return response.status(500).json({error: 'Server error'});
    }
});


export default {
    logIn
};