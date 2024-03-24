import express from 'express';
import { createPost, deletePost, getPostById, likeUnlikePost } from '../controller/post.controller.js';
import { authProtect } from '../middleware/auth.middleware.js';
import { upload } from '../middleware/multer.middleware.js';

const router = express.Router();

router.post('/create-post', authProtect, upload.single('post_image'), createPost);
router.get('/get-post/:id', authProtect, getPostById);
router.delete('/delete-post/:id', authProtect, deletePost);
router.get('/like-unlike/:id', authProtect, likeUnlikePost);

export default router;