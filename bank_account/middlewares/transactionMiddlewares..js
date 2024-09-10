import userService from "../services/userService.js";
import Ajw from 'ajv';

const transactionSchema = {
    type: "object",
    properties: {
        addressee: {type: "string"},
        amount: {type: "number"}
    },
    required: ["addressee", "amount"]
};

const verifySchema = async(request, response, next) => {
    if (!new Ajw().validate(transactionSchema, request.body)) {
        console.log("error from verify schema transaction")
        return response.status(400).json({error: "Invalid data: please fill all fields"}); 
    }

    next();
}

const verifyTransaction = async(request, response, next) => {
    if (request.email === request.body.addressee) {
        return response.status(400).json({error: "Sender and receiver can not be the same"});
    }

    if (request.body.amount <= 0) {
        return response.status(400).json({error: "Amount can not be less or equal zero"});
    }

    const sender = await userService.getUserByEmail(request.email);
    if (request.body.amount > sender.balance) {
        return response.status(400).json({error: "Amount can not be more than balance"});
    }

    const receiver = await userService.getUserByEmail(request.body.addressee);
    if (!receiver) {
        return response.status(400).json({error: "User with email " + request.body.addressee + " does not exist"});
    }

    console.log("transaction verification is finished");

    next();
}

export default {
    verifySchema,
    verifyTransaction
}