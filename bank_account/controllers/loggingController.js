import { text } from 'express';
import loggingService from '../services/loggingService.js';
import nodemailer from 'nodemailer';
import {LocalStorage} from 'node-localstorage';

global.localStorage = new LocalStorage('./scratch');

function getRundomSixDigits() {
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

const signUp = ((request, response) => {
    const user = loggingService.getUserByEmail(request.body.email);
    if (user) {
        response.status(409).json({error: 'Email already exists'});
    } 
    const createdUser = loggingService.createUser(request.body);
    if (user === 500) {
        response.status(409).json({error: 'Server error'});
    } else {
        localStorage.setItem("user_id", createdUser.id);

        const verificationCode = getRundomSixDigits();
        localStorage.setItem("verification_code", verificationCode);
        console.log(verificationCode + " == " + localStorage.getItem("verification_code"));

        sendVerificationCode(createdUser.email, verificationCode);

        response.status(201).json(createdUser);
    }
});

const signUpVerification = ((request, response) => {

    const correctCode = localStorage.getItem("verification_code");
    if (request.body.code !== correctCode) {
        loggingService.deleteUserByIdInLocalStorage(localStorage.getItem("user_id"));
        localStorage.clear();
        response.status(404).json({error: 'Invalid verifivation code. Restart your registration'});
    } else {
        loggingService.activateUser(localStorage.getItem("user_id"));
        response.status(200).json({message: 'Verification was successful'});
    }
});


const logIn = ((request, response) => {
    
});


const logOut = ((request, response) => {
    
});


export default {
    signUp,
    signUpVerification,
    logIn,
    logOut
}