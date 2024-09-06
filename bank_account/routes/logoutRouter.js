import express from 'express';
import logOutController from '../controllers/logOutController.js';

const router = express.Router();

router.delete('/', logOutController.logOut);

export default router;