// const express = require('express') // commonjs
//es module or esm
import express from 'express';

import authRoutes from './routes/authRoute.js';
import movieRoutes from './routes/movieRoute.js';
import tvRoutes from './routes/tvRoute.js';

import { ENV_VARS } from './config/envVars.js';
import { connectionDB } from './config/db.js';

const app = express();
const PORT = ENV_VARS.PORT
app.use(express.json()); // will allow to use parse req.body

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/movie', movieRoutes);
app.use('/api/v1/tv', tvRoutes);

app.listen(PORT, () => {
    console.log('Server started at http://localhost' + PORT);
    connectionDB();
});


