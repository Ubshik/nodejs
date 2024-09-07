import express from 'express';
import logInController from '../controllers/logInController.js';
import checkEmail from '../middlewares/emailMiddleware.js';
// import checkPassword from '../middlewares/passwordMiddleware.js';

const router = express.Router();

router.post('/', checkEmail.verifyEmail,
                    // checkPassword.verifyPassword,
                    logInController.logIn);

export default router;