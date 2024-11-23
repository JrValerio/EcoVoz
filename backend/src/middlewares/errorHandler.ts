import { Request, Response, NextFunction } from 'express';

/**
 * Middleware para tratamento de erros global.
 * Captura erros que ocorrem durante o processamento da requisição e envia uma resposta de erro padronizada.
 */
const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  // Log do erro no console
  console.error('[ERROR] Erro detectado:', err);

  // Define o código de status e a mensagem de erro
  let statusCode = 500; // Código de status padrão: Internal Server Error
  let message = 'Erro interno no servidor';

  // Se o erro for uma instância de Error, extrai o status e a mensagem
  if (err instanceof Error) {
    statusCode = (err as { status?: number }).status || 500;
    message = err.message;
  }

  // Log do erro com detalhes da requisição
  console.error(`[ERROR] ${req.method} ${req.originalUrl} - ${statusCode} - ${message}`);

  // Envia a resposta de erro com o status code e a mensagem
  res.status(statusCode).json({
    success: false,
    message,
  });

  next(); // Chama o próximo middleware na cadeia
};

export default errorMiddleware;