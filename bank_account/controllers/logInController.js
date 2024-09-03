import signupService from '../services/signupService.js';
import logInService from '../services/logInService.js';
// import {LocalStorage} from 'node-localstorage';

// global.localStorage = new LocalStorage('./scratch');

const logIn = (async(request, response) => {
    console.log('logIn controller');
    try {
        const user = signupService.getUserByEmail(request.body.email);
        if (!user) {
            return response.status(401).json({error: 'Invalid credentials'});
        }
    
        const isMatchedPass = await logInService.isMatchedPassword(request.body.password, user.password);
        if (!isMatchedPass) {
            return response.status(401).json({error: 'Invalid credentials'});
        }
    
        const token = logInService.getToken(request.body.email);
        response.status(200).json({token});
    } catch(error) {
        response.status(500).json({error: 'Server error'});
    }
});


// const logOut = ((request, response) => {
    
// });


export default {
    logIn
}