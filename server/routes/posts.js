import express from 'express';

import { getPosts, getPost, createPost, updatePost, likePost, deletePost, dokterContent, klinikContent, pasienContent } from '../controllers/posts.js';

const router = express.Router();
import auth from "../middleware/auth.js";

router.get('/', getPosts);
router.post('/',auth.verifyToken,  createPost);
router.get('/dokter',[auth.verifyToken, auth.isDokter],  dokterContent);
router.get('/pasien',[auth.verifyToken, auth.isPasien],  pasienContent);
router.get('/klinik',[auth.verifyToken, auth.isKlinik],  klinikContent);
router.patch('/:id', auth.verifyToken, updatePost);
router.delete('/:id', auth.verifyToken, deletePost);
router.patch('/:id/likePost', auth.verifyToken, likePost);

export default router;
