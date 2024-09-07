import signupService from "../services/signupService.js";

const verifyTransaction = async(request, response, next) => {
    if (request.body.amount <= 0) {
        return response.status(400).json({error: "Amount can not be less or equal zero"});
    }

    const sender = await signupService.getUserByEmail(request.email);
    if (request.body.amount > sender.balance) {
        return response.status(400).json({error: "Amount can not be more than balance"});
    }

    const receiver = await signupService.getUserByEmail(request.body.addressee);
    if (!receiver) {
        return response.status(400).json({error: "User with email " + request.body.addressee + " does not exist"});
    }

    console.log("transaction verification is finished");

    next();
}

export default {
    verifyTransaction
}