import express from 'express';
import logInController from '../controllers/logInController.js';

const router = express.Router();

router.post('/', logInController.logIn);

export default router;