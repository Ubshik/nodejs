//Minimum eight and maximum 10 characters, 
//at least one uppercase letter, one lowercase letter, 
//one number and one special character:
const verifyPassword = async(request, response, next) => {
    if (!request.body.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/)) {
        return response.status(400).json({error: "Invalid password"}); 
    }

    next();
}

export default {
    verifyPassword
}