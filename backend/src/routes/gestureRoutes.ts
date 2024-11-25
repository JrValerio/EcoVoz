// src/routes/gestureRoutes.ts
import express from 'express';
import { processGesture, processVideoGesture } from '../controllers/gestureController';
import upload from '../middlewares/multerConfig';

const router = express.Router();

// Rota para lidar com reconhecimento de gestos através de dados do cliente
router.post('/gestures', processGesture);

// Rota para upload de vídeo e envio ao backend Python para reconhecimento de gestos
router.post('/gestures/video', upload.single('video'), processVideoGesture);

export default router;
