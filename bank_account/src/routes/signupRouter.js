import express from 'express';
import signupController from '../controllers/signupController.js';
import checkSchema from '../middlewares/signupMiddleware.js';
import checkEmail from '../middlewares/emailMiddleware.js';
import checkPhone from '../middlewares/phoneMiddleware.js';
// import checkPassword from '../middlewares/passwordMiddleware.js';
import checkVerificationEmailCode from '../middlewares/verificationEmailCodeMiddleware.js';

const router = express.Router();

router.post('/', checkSchema.verifySchema,
                    checkEmail.verifyEmail,
                    checkPhone.verifyPhone,
                    // checkPassword.verifyPassword,
                    signupController.signUp);

router.post('/verification', checkVerificationEmailCode.verifySchema,
                                checkVerificationEmailCode.verifyUserExistance,
                                signupController.signUpVerification);

export default router;