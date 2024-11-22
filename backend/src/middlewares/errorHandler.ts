import { Request, Response, NextFunction } from 'express';

const errorMiddleware = (err: unknown, req: Request, res: Response, next: NextFunction) => {
  console.error('Erro detectado:', err);

  const statusCode = (err as { status?: number }).status || 500;
  res.status(statusCode).json({
    success: false,
    message: (err as Error).message || 'Erro interno no servidor',
  });

  next(); 
};
export default errorMiddleware;
