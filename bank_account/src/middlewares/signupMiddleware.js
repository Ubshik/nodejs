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
    console.log("========== verify signup_schema ==========");
    if (!new Ajw().validate(signUpSchema, request.body)) {
        return response.status(400).json({error: "Invalid data: please fill all fields"}); 
    }
    console.log("signup_schema is correct");
    next();
}

export default {
    verifySchema
}