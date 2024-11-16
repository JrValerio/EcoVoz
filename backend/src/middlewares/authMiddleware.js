import jwt from 'jsonwebtoken';
const { verify } = jwt;
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ error: 'Acesso negado. Token não fornecido.' });
    return;
  }
  const token = authHeader.replace('Bearer ', '');
  try {
    const decoded = verify(token, process.env.JWT_SECRET || 'default_secret');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error('Erro ao verificar token:', error);
    res.status(401).json({ error: 'Token inválido.' });
  }
};
export default authMiddleware;
