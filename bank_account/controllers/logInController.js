import signupService from '../services/signupService.js';
import logInService from '../services/logInService.js';

const logIn = (async(request, response) => {
    console.log('logIn controller');
    try {
        const user = await signupService.getUserByEmail(request.body.email);
        console.log('logIn: user is');
        if (!user) {
            return response.status(401).json({error: 'Invalid credentials'});
        }
    
        const isMatchedPass = await logInService.isMatchedPassword(request.body.password, user.hashedPassword);
        console.log('logIn: password is matched ' + isMatchedPass);
        if (!isMatchedPass) {
            return response.status(401).json({error: 'Invalid credentials'});
        }
    
        const token = logInService.getToken(request.body.email);
        response.status(200).json({token: token});
    } catch(error) {
        response.status(500).json({error: 'Server error'});
    }
});


export default {
    logIn
};