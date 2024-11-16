import { Router, Request, Response } from 'express';

const router = Router();

// Rota para checar o status da API
router.get('/status', (req: Request, res: Response) => {
  try {
    res.status(200).json({
      success: true,
      message: 'EcoVoz API is running',
      timestamp: new Date().toISOString(), // Inclui o timestamp
    });
  } catch (error) {
    console.error('Erro ao verificar status:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao verificar o status da API',
    });
  }
});

export default router;
