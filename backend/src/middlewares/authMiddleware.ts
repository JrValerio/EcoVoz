import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface AuthenticatedRequest extends Request {
  userId?: string; // Adiciona `userId` ao objeto da requisição para uso posterior
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization; // Lê o cabeçalho Authorization

  if (!authHeader) {
    console.warn('Tentativa de acesso sem token.');
    res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    return;
  }

  // Extrai o token do cabeçalho no formato "Bearer <token>"
  const token = authHeader?.replace('Bearer ', '');
  console.log('Token recebido no middleware:', token);

if (!token) {
  console.warn('Token ausente ou inválido:', authHeader);
  res.status(401).json({ error: 'Token inválido ou ausente.' });
  return;
}


  try {
    // Verifica o token JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as JwtPayload;

    // Garante que o token contém o campo `userId`
    if (typeof decoded !== 'object' || !decoded.userId) {
      throw new Error('Payload do token inválido.');
    }

    req.userId = decoded.userId; // Adiciona o `userId` ao objeto da requisição
    next(); // Passa para o próximo middleware ou controlador
  } catch (error: unknown) {
    console.error('Erro ao verificar token:', error instanceof Error ? error.message : String(error));
    res.status(401).json({ error: 'Token inválido ou expirado.' });
  }
};
export default authMiddleware;
