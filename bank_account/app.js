import express from 'express';
import signupRouter from './routes/signupRouter.js';
import loginRouter from './routes/loginRouter.js';

// const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
})

app.use(express.json());
app.use('/api/v1/signup', signupRouter);
app.use('/api/v1/login', loginRouter);