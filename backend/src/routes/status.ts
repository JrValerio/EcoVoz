import { Router, Request, Response } from 'express';

const router = Router();

/**
 * Rota para verificar o status da API.
 * Retorna um JSON com informações sobre o status da API, incluindo uma mensagem,
 * um timestamp e um indicador de sucesso.
 */
router.get('/status', (req: Request, res: Response) => {
  try {
    // Tenta retornar uma resposta de sucesso com status 200
    res.status(200).json({
      success: true,
      message: 'EcoVoz API is running',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    // Em caso de erro, registra o erro no console e retorna uma resposta de erro com status 500
    console.error('[ERROR] Erro ao verificar status:', error);
    res.status(500).json({
      success: false,
      message: 'Erro ao verificar o status da API',
    });
  }
});

export default router;