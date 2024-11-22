import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import authMiddleware from '../middlewares/authMiddleware';
import AuthController from 'src/controllers/AuthController';

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const router = express.Router();

// Endpoint para login via Google
router.post('/google', AuthController.googleLogin);

// Registration route
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  // Verificação de campos obrigatórios
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
    console.error('Erro ao registrar usuário:', error);
    res.status(500).json({ message: 'Erro ao registrar usuário.' });
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
      // ...
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
    console.error('Erro ao fazer login:', error);
    res.status(500).json({ message: 'Erro interno no servidor.' });
  }
});
// Validação de token
router.post('/validate', async (req: Request, res: Response): Promise<void> => {
  const { token } = req.body;

  const jwtSecret = process.env.JWT_SECRET;
  if (!token) {
    console.warn('Validação de token falhou: Token não fornecido.');
    res.status(401).json({ message: 'Token não fornecido.' });
    return;
  }

  if (!jwtSecret) {
    console.error('JWT_SECRET não está definido.');
    res.status(500).json({ message: 'JWT_SECRET não está definido.' });
    return;
  }

  try {
    // Decodifica e verifica o token
    const decoded = jwt.verify(token, jwtSecret) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user) {
      console.warn(`Usuário não encontrado para o token: ${decoded.userId}`);
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
    console.error('Erro ao validar token:', error);
    res.status(401).json({ message: 'Token inválido.' });
  }
});

// Rota protegida (exemplo)
router.get(
  '/protected',
  authMiddleware,
  (req: AuthenticatedRequest, res: Response): void => {
    res.status(200).json({
      message: 'Acesso concedido.',
      userId: req.userId,
    });
  },
);

export default router;
