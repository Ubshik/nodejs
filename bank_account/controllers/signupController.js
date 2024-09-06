import signupService from '../services/signupService.js';
import nodemailer from 'nodemailer';
import {LocalStorage} from 'node-localstorage';

global.localStorage = new LocalStorage('./scratch');

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
    const user = await signupService.getUserByEmail(request.body.email);
    if (user) {
        response.status(409).json({error: 'Email already exists'});
    } else {
        const statusCreatedUser = await signupService.createUser(request.body);
        if (statusCreatedUser === 500) {
            response.status(statusCreatedUser).json({error: 'Server error'});
        } else {
            localStorage.setItem("user_email", request.body.email);

            const verificationCode = getRandomSixDigits();
            localStorage.setItem("verification_code", verificationCode);
            console.log(verificationCode + " == " + localStorage.getItem("verification_code"));

            sendVerificationCode(request.body.email, verificationCode);

            // const createdUser = await signupService.getUserByEmail(request.body.email);
            // response.status(statusCreatedUser).json(createdUser);

            response.status(statusCreatedUser).json({message: 'User registred successfully'});
        }
    }
});

const signUpVerification = ((request, response) => {
    console.log("inside signUpVerification");
    const correctCode = localStorage.getItem("verification_code");
    console.log("correct code: " + correctCode);
    if (request.body.code !== correctCode) {
        localStorage.clear();
        response.status(404).json({error: 'Invalid verifivation code. Restart your registration'});
    } else {
        signupService.verifyEmail(localStorage.getItem("user_email"));
        response.status(200).json({message: 'Verification was successful'});
    }
});

export default {
    signUp,
    signUpVerification
}