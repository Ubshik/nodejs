import Ajw from 'ajv';
import userService from '../services/userService.js';

const verificationEmailCodeSchema = {
    type: "object",
    properties: {
        email: {type: "string"},
        code: {type: "number"}
    },
    required: ["email", "code"]
};

const verifySchema = async(request, response, next) => {
    if (!new Ajw().validate(verificationEmailCodeSchema, request.body)) {
        return response.status(400).json({error: "Invalid data: please fill all fields"}); 
    }

    next();
}

const verifyUserExistance = async(request, response, next) => {
    const userFromDB = await userService.getUserByEmail(request.body.email);
    if (!userFromDB) {
        return response.status(400).json({error: "Bad request. Check email or restart registration"});
    }

    request.correctCode = userFromDB.verificationCode;

    next();
}

export default {
    verifySchema,
    verifyUserExistance
}