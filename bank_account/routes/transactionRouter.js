import express from 'express';
import jwtMiddleware from '../middlewares/jwtMiddleware.js';
import transactionMiddlewares from '../middlewares/transactionMiddlewares..js';
import transactionController from '../controllers/transactionController.js';

const router = express.Router();

//to add user is not the same who send
router.post('/', jwtMiddleware.verifyToken,
                transactionMiddlewares.verifySchema,
                transactionMiddlewares.verifyTransaction, 
                transactionController.doTransaction);

export default router;