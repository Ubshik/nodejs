import express from 'express';
import loginRoutes from './routes/loggingRouter.js';

// const express = require('express');
const app = express();
const PORT = 3000;

app.listen(PORT, () => {
    console.log("server is listening on port " + PORT);
})

app.use(express.json());
app.use('/api/v1', loginRoutes);