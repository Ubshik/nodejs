import Ajw from 'ajv';

const signUpSchema = {
    type: "object",
    properties: {
        email: {type: "string"},
        phone: {type: "string"},
        password: {type: "string"}
    },
    required: ["email", "phone", "password"]
};

const verifySchema = async(request, response, next) => {
    if (!new Ajw().validate(signUpSchema, request.body)) {
        return response.status(400).json({error: "Invalid data: please fill all fields"}); 
    }

    next();
}

export default {
    verifySchema
}