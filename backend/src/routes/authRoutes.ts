import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authMiddleware from '../middlewares/authMiddleware';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();

// Registration route
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
    return;
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: 'Email já registrado.' });
      return;
    }

    const user = new User({ username, email, password });
    await user.save();

    res.status(201).json({ message: 'Usuário registrado com sucesso', user });
  } catch (error) {
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.', error });
  }
});

// Login route
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

    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const token = jwt.sign({ userId: user._id }, jwtSecret, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });

    res.status(200).json({ message: 'Login realizado com sucesso.', token });
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro ao fazer login.', error });
  }
});

router.post('/auth/validate', async (req: Request, res: Response): Promise<void> => {
  const token = req.body.token;
  const jwtSecret = process.env.JWT_SECRET;

  if (!token) {
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  if (!jwtSecret) {
    res.status(500).json({ message: 'JWT_SECRET não está definido.' });
    return;
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    const userId = (decoded as { userId: string }).userId;

    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: 'Usuário não encontrado.' });
      return;
    }
    res.status(200).json({ user });
  } catch (error: unknown) {
    console.error('Error verifying token:', error);
    res.status(401).json({ message: 'Token inválido.' });
  }
});// Protected route
router.get('/protected', authMiddleware, (req: Request, res: Response): void => {
  const authenticatedReq = req as AuthenticatedRequest;
  res.status(200).json({ message: 'Acesso concedido.', userId: authenticatedReq.userId });
});

export default router;
