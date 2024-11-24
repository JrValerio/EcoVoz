import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

// Interface para o objeto decodificado do token JWT
interface CustomJwtPayload extends JwtPayload {
  id: string;
  email: string;
  userId: string;
  // Adicione outras propriedades conforme necessário
}

/**
 * Middleware de autenticação JWT. 
 * Verifica a presença e validade do token JWT no cabeçalho Authorization.
 * Se o token for válido, decodifica o token e define o objeto decodificado na propriedade `user` da requisição.
 * Se o token não for fornecido ou for inválido, retorna uma resposta de erro 401 (não autorizado).
 */
const authMiddleware = (req: Request & { user?: unknown }, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization;

  // Verifica se o cabeçalho Authorization está presente
  if (!authHeader) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  // Verifica se o cabeçalho Authorization começa com 'Bearer '
  if (!authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Token inválido.' });
    return;
  }

  // Extrai o token do cabeçalho
  const token = authHeader.split(' ')[1];

  try {
    // Tenta decodificar o token usando a chave secreta JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as CustomJwtPayload; // Usa a interface CustomJwtPayload

    // Validação adicional no payload do token
    if (!decoded.userId) {
      console.warn('[WARN] Payload inválido: ID do usuário ausente.');
      res.status(401).json({ error: 'Payload inválido.' });
      return;
    }

    // Define o objeto decodificado na propriedade user da requisição
    req.user = decoded;

    // Chama o próximo middleware na cadeia
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      console.error('[ERROR] Token expirado:', error);
      res.status(401).json({ error: 'Token expirado.' });
    } else if (error.name === 'JsonWebTokenError') {
      console.error('[ERROR] Token inválido:', error);
      res.status(401).json({ error: 'Token inválido.' });
    } else {
      console.error('[ERROR] Erro ao verificar o token:', error);
      res.status(500).json({ error: 'Falha na autenticação.' });
    }
  }
};

export default authMiddleware;