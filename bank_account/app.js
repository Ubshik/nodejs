import express from 'express';
import signupRouter from './routes/signupRouter.js';
import loginRouter from './routes/loginRouter.js';
import logoutRouter from './routes/logoutRouter.js';
import dashboardRouter from './routes/dashboardRouter.js';
import transactionRouter from './routes/transactionRouter.js';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// const express = require('express');
const app = express();
const PORT = process.env.APP_PORT;

app.use(express.json());
app.use('/api/v1/signup', signupRouter);
app.use('/api/v1/login', loginRouter);
app.use('/api/v1/logout', logoutRouter);
app.use('/api/v1/dashboard', dashboardRouter);
app.use('/api/v1/transaction', transactionRouter);

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
});

dotenv.config();

const dbURL = 'mongodb://' + process.env.DATABASE_HOST + ':' + process.env.DATABASE_PORT + '/' +  process.env.DATABASE_NAME;
console.log("mongo_url: " + dbURL);

mongoose.connect(dbURL)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB: ', error)
    });