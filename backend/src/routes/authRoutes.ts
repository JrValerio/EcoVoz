import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import User from '../models/User';
import authMiddleware from '../middlewares/authMiddleware';
import { googleLogin } from '../services/googleAuthService';

// Define a interface para requisições autenticadas
interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();

// Rota para login via Google
router.post('/google', googleLogin);

/**
 * Rota para registrar um novo usuário.
 * 
 * @param req A requisição HTTP.
 * @param res A resposta HTTP.
 */
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  // Validação de campos obrigatórios
  if (!username || !email || !password) {
    res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    return;
  }

  try {
    // Verifica se o email já está registrado
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email já registrado.' });
      return;
    }

    // Cria o novo usuário
    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error('[ERROR] Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
  }
});

/**
 * Rota para realizar o login do usuário.
 * 
 * @param req A requisição HTTP.
 * @param res A resposta HTTP.
 */
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: 'Credenciais inválidas.' });
      return;
    }

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      res.status(401).json({ message: 'Credenciais inválidas.' });
      return;
    }

    const jwtSecret = process.env.JWT_SECRET || 'default_secret';
    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: '1h',
    });

    res.status(200).json({
      message: 'Login realizado com sucesso.',
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('[ERROR] Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});

/**
 * Rota para validar o token JWT.
 * 
 * @param req A requisição HTTP.
 * @param res A resposta HTTP.
 */
router.post('/validate', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    console.warn('[WARN] Validação de token falhou: Token não fornecido.');
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  if (!jwtSecret) {
    console.error('[ERROR] JWT_SECRET não está definido.');
    res.status(500).json({ message: 'JWT_SECRET não está definido.' });
    return;
  }

  try {
    // Decodifica e verifica o token
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      console.warn(`[WARN] Usuário não encontrado para o token: ${decoded.userId}`);
      res.status(404).json({ message: 'Usuário não encontrado.' });
      return;
    }

    res.status(200).json({
      message: 'Token válido.',
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error('[ERROR] Erro ao validar token:', error);
    res.status(401).json({ message: 'Token inválido.' });
  }
});

/**
 * Rota protegida (exemplo).
 * 
 * @param req A requisição HTTP.
 * @param res A resposta HTTP.
 */
router.get(
  '/protected',
  authMiddleware, // Aplica o middleware de autenticação
  (req: AuthenticatedRequest, res: Response): void => {
    res.status(200).json({
      message: 'Acesso concedido.',
      userId: req.userId,
    });
  }
);

export default router;