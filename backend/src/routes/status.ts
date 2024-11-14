import { Router } from 'express';

const router = Router();

router.get('/status', (req, res) => {
  res.json({ message: 'EcoVoz API is running' });
});

export default router;
