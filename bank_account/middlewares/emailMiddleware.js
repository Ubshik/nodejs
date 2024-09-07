const verifyEmail = async(request, response, next) => {
    if (!request.body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        return response.status(400).json({error: "Invalid email"}); 
    }

    next();
}

export default {
    verifyEmail
}