import express from 'express';
// import { signUp, logIn, logOut } from '../controllers/loggingController.js';
import loggingController from '../controllers/loggingController.js';

const router = express.Router();

// const {
//     signUp,
//     logIn,
//     logOut
// } = require('../controllers/loggingController').default;

router.post('/signup', loggingController.signUp);
router.post('/signup/verification', loggingController.signUpVerification);
// router.post('/login', logIn);
// router.delete('/logout', logOut);

export default router;