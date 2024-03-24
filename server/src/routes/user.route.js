import express from 'express';
import { followUnFollow, login, logout, signup } from '../controller/user.controller.js';
import { authProtect } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/follow/:id', authProtect, followUnFollow)

export default router;