import express from 'express';
import { googleLogin, signup, login, verifyToken } from '../Controller/User/authController.js';

const router = express.Router();
router.post('/google', googleLogin);
router.post('/signup', signup);
router.post('/login', login);
router.get('/verify', verifyToken);

export default router;