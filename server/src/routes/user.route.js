import express from 'express';
import { changePassword, followUnFollow, getUserById, login, logout, sendOtp, signup, updateUser } from '../controller/user.controller.js';
import { authProtect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/otp', sendOtp)
router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.post('/change-password', authProtect, changePassword)
router.get('/follow/:id', authProtect, followUnFollow)
router.get('/profile/:id', getUserById)
router.post('/user-update', authProtect, upload.single('profilePicture'), updateUser)

export default router;