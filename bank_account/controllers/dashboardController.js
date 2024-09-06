import signupService from '../services/signupService.js';

const getDashboard = async(request, response) => {
    console.log("email from request: " + request.email);
    const user = await signupService.getUserByEmail(request.email);
    console.log("user from db: " + JSON.stringify(user));
    const dtoUser = {
        email: user.email,
        balance: user.balance,
        transactions: user.transactions
    }
    return response.status(200).json(dtoUser);
}

export default {
    getDashboard
}