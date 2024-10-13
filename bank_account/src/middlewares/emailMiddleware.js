const verifyEmail = async(request, response, next) => {
    console.log("========== verify email ==========");
    if (!request.body.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
        console.log("it is an INcorrecrt email");
        return response.status(400).json({error: "Invalid email"}); 
    }

    console.log("email is correct");
    next();
}

export default {
    verifyEmail
}