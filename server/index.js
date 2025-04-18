// server.js or index.js (ES Module version)
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { connectDB } from './DB/index.js';
import { auth } from 'express-openid-connect'; // ES Module compatible import

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET_STRING,
    baseURL: 'http://localhost:5000', // changed https to http unless using SSL locally
    clientID: 'cMMs3oA7sMU9vBuxdqGM2uppDkgYFwXr',
    issuerBaseURL: 'https://dev-fh1af6gdnrvqotme.us.auth0.com'
};

// Auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
