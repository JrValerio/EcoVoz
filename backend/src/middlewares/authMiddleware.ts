import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'default_secret');

    // Define o objeto decodificado na propriedade user da requisição
    req.user = decoded;

    // Chama o próximo middleware na cadeia
    next();
  } catch (error) {
    // Em caso de erro na verificação do token, registra o erro no console e retorna uma resposta de erro
    console.error('[ERROR] Erro ao verificar o token:', error);
    res.status(401).json({ message: 'Token inválido ou expirado.' });
  }
};

export default authMiddleware;