const verifyCode = async(request, response, next) => {
    if (!request.body.code.match(/\d{6}/)) {
        return response.status(400).json({error: "Invalid verification code"}); 
    }

    next();
}

export default {
    verifyCode
}