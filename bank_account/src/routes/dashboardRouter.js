import express from 'express';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import dashboardController from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', jwtMiddleware.verifyToken, dashboardController.getDashboard);

export default router;