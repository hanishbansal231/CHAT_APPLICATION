import express from 'express';
import { changePassword, followUnFollow, login, logout, sendOtp, signup } from '../controller/user.controller.js';
import { authProtect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/otp', sendOtp)
router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/change-password', authProtect, changePassword)
router.get('/follow/:id', authProtect, followUnFollow)

export default router;