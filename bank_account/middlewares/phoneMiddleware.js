const verifyPhone = async(request, response, next) => {
    if (!request.body.phone.match(/(0)\d{9}/)) {
        return response.status(400).json({error: "Invalid phone number"}); 
    }

    next();
}

export default {
    verifyPhone
}