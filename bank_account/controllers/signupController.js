import userService from '../services/userService.js';
import signupService from '../services/signupService.js';
import nodemailer from 'nodemailer';

function getRandomSixDigits() {
    return Math.floor(100_000 + Math.random() * 900_000);
}

function sendVerificationCode(email, code) {
    let result;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fs154notify@gmail.com',
            pass: 'lbbpwvrlvkczfdzd'
        }
    });

    const message = 'Your verification code is ' + code;

    const mailOptions = {
        from: 'fs154notify@gmail.com',
        to: email,
        subject: 'Sending verification code to submit registration in the bank_account application',
        text: message
    };

    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            result = 500;
        } else {
            console.log('Email sent: ' + info.response);
            result = 200;
        }
    });

    return result;
}

const signUp = (async(request, response) => {
    const user = await userService.getUserByEmail(request.body.email);
    if (user) {
        return response.status(409).json({error: 'Email already exists'});
    }

    const verificationCode = getRandomSixDigits();
    console.log("verification_code: " + verificationCode);

    const statusCreatedUser = await signupService.createUser(request.body, verificationCode);
    if (statusCreatedUser === 500) {
        return response.status(statusCreatedUser).json({error: 'Server error'});
    }

    sendVerificationCode(request.body.email, verificationCode);

    return response.status(statusCreatedUser).json({message: 'User registred successfully'});
});

const signUpVerification = (async(request, response) => {
    console.log("inside signUpVerification");
    const correctCode = request.correctCode;
    console.log("correct code: " + correctCode);

    if (request.body.code !== correctCode) {
        return response.status(404).json({error: 'Invalid verification code'});
    }

    const status = await signupService.verifyEmail(request.body.email);
    if (status === 500) {
        return response.status(status).json({message: 'Server error'});   
    }
    return response.status(status).json({message: 'Verification was successful'});
});

export default {
    signUp,
    signUpVerification
}