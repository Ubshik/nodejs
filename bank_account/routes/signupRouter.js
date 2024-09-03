import express from 'express';
import signupController from '../controllers/signupController.js';

const router = express.Router();

router.post('/', signupController.signUp);
router.post('/verification', signupController.signUpVerification);

export default router;