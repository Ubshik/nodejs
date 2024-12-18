import express from 'express';
import cors from 'cors';
import signupRouter from './routes/signupRouter.js';
import loginRouter from './routes/loginRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import dashboardRouter from './routes/dashboardRouter.js';
import transactionRouter from './routes/transactionRouter.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import path from 'path'; //for static pages for dcocker (for import)
import { fileURLToPath  } from 'url'; //for static pages for dcocker

// const express = require('express');
const app = express();
const PORT = process.env.APP_PORT;

app.use(cors());
app.use(express.static("frontend"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/static', express.static(path.join(__dirname, '..', 'frontend')));

app.use(express.json());
app.use('/api/v1/signup', signupRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/logout', logoutRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/transaction', transactionRouter);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
});

dotenv.config();

// !!! for local machine
// const dbURL = 'mongodb://' + process.env.DATABASE_HOST + 
//                 ':' + process.env.DATABASE_PORT + 
//                 '/' +  process.env.DATABASE_NAME +
//                 '?directConnection=true&replicaSet=replicaset&retryWrites=true';

// !!! for docker compose
const dbURL = 'mongodb://admin-123:password-123@mongodb-primary:27017/bank_app?authSource=bank_app';

console.log("mongo_url: " + dbURL);

mongoose.connect(dbURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error)
    });