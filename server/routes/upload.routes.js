import express from 'express';
import multer from 'multer';
import { uploadLeads } from '../controllers/uploadController.js';
import auth from '../middleware/auth.js';

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

// Upload & distribute leads
router.post('/', auth, upload.single('file'), uploadLeads);

export default router;
