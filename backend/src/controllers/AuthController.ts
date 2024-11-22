import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import UserService from '../services/UserService';
import { verifyGoogleToken } from '../services/googleAuthService';
import User from '../models/User';

const AuthController = {
  // Login com Google
  async googleLogin(req: Request, res: Response): Promise<void> {
    console.log('Requisição recebida em /api/auth/google:', req.body);
    const { idToken } = req.body;

    if (!idToken) {
      res.status(400).json({ message: 'ID Token é obrigatório.' });
      return;
    }

    try {
      // Verifica o token do Google
      const payload = await verifyGoogleToken(idToken);

      if (!payload || !payload.email) {
        res.status(400).json({ message: 'Erro ao verificar o token do Google.' });
        return;
      }

      // Busca o usuário no banco de dados
      let user = await User.findOne({ email: payload.email });

      if (!user) {
        // Cria o usuário caso não exista
        user = new User({
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        });
        await user.save();
      }

      // Gera o token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET || 'default_secret', {
        expiresIn: process.env.JWT_EXPIRES_IN || '1h',
      });

      res.status(200).json({ token, user });
    } catch (error) {
      console.error('Erro no login com Google:', error);
      res.status(500).json({ message: 'Erro no servidor ao autenticar com o Google.' });
    }
  },

  

  // Login com email e senha
  async login(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { email, password } = req.body;

      const user = await UserService.getUserByEmail(email);

      if (!user || !user.comparePassword) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        {
          expiresIn: process.env.JWT_EXPIRES_IN || '1h',
        },
      );

      res.status(200).json({
        message: 'Login realizado com sucesso.',
        token,
        user: {
          id: (user._id as unknown as { toString(): string }).toString(),
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Erro no login:', error);
      res.status(500).json({ error: 'Erro ao realizar o login.' });
    }
  },  // Registro de usuário
  async createUser(req: Request, res: Response): Promise<void> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    try {
      const { username, email, password } = req.body;

      const user = await UserService.createUser(username, email, password);

      res.status(201).json({
        message: 'Usuário criado com sucesso.',
        user: {
          id: (user._id as unknown as { toString(): string }).toString(),
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  },

  // Busca um usuário
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      const user = await UserService.getUserById(id);

      if (!user) {
        res.status(404).json({ error: 'Usuário não encontrado.' });
        return;
      }

      res.status(200).json({
        id: (user._id as unknown as { toString(): string }).toString(),
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error('Erro ao buscar usuário:', error);
      res.status(404).json({ error: 'Erro ao buscar usuário.' });
    }
  },
  
  // Atualiza um usuário
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedUser = await UserService.updateUser(id, updates);

      if (!updatedUser) {
        res
          .status(404)
          .json({ error: 'Usuário não encontrado para atualização.' });
        return;
      }

      res.status(200).json({
        message: 'Usuário atualizado com sucesso.',
        user: {
          id: (updatedUser._id as unknown as { toString(): string }).toString(),
          username: updatedUser.username,
          email: updatedUser.email,
          createdAt: updatedUser.createdAt,
          updatedAt: updatedUser.updatedAt,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(400).json({ error: (error as Error).message });
    }
  },
};

export default AuthController;
