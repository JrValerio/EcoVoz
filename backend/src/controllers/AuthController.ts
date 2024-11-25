import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import { MongoServerError } from 'mongodb';

import UserService from '../services/UserService.js';
import { verifyGoogleToken } from '../services/googleAuthService.js';
import User from '../models/User.js';

// Interface para erros de validação do Mongoose
interface MongooseValidationError extends Error {
  errors: {
    [key: string]: {
      message: string;
    };
  };
}

// Funções utilitárias para respostas de erro e sucesso
const handleErrorResponse = (res: Response, status: number, message: string) => {
  res.status(status).json({ message });
};

const handleSuccessResponse = (res: Response, data: object) => {
  res.status(200).json(data);
};


/**
 * Controlador para as rotas de autenticação.
 */
const AuthController = {
  /**
   * Realiza o login do usuário com o Google.
   * @param req A requisição HTTP.
   * @param res A resposta HTTP.
   */
  async googleLogin(req: Request, res: Response): Promise<void> {
    console.log('[INFO] Requisição recebida em /api/auth/google:', req.body);
    const { idToken } = req.body;

    if (!idToken) {
      handleErrorResponse(res, 400, 'ID Token é obrigatório.');
      return;
    }

    try {
      const payload = await verifyGoogleToken(idToken);

      if (!payload || !payload.email) {
        handleErrorResponse(res, 400, 'Erro ao verificar o token do Google.');
        return;
      }

      let user = await User.findOne({ email: payload.email });

      if (!user) {
        console.log('[INFO] Criando um novo usuário...');
        user = new User({
          email: payload.email,
          name: payload.name,
          picture: payload.picture,
        });
        await user.save();
        console.log('[SUCCESS] Usuário criado:', user);
      } else {
        console.log('[INFO] Usuário encontrado:', user);
      }

      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      handleSuccessResponse(res, { token, user });
    } catch (error) {
      console.error('[ERROR] Erro no login com Google:', error);
      handleErrorResponse(res, 500, 'Erro no servidor ao autenticar com o Google.');
    }
  },

  /**
   * Realiza o login do usuário com email e senha.
   * @param req A requisição HTTP.
   * @param res A resposta HTTP.
   */
  async login(req: Request, res: Response): Promise<void> {
    // Valida os dados da requisição
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      handleErrorResponse(res, 400, `Dados inválidos: ${errorMessages.join('; ')}`);
      return;
    }

    try {
      const { email, password } = req.body;
      const user = await UserService.getUserByEmail(email);

      if (!user || !user.comparePassword || !(await user.comparePassword(password))) {
        handleErrorResponse(res, 401, 'Credenciais inválidas.');
        return;
      }

      // Gera o token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: process.env.JWT_EXPIRES_IN || '1h' }
      );

      handleSuccessResponse(res, {
        message: 'Login realizado com sucesso.',
        token,
        user: {
          id: (user._id as unknown as { toString(): string }).toString(),
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('[ERROR] Erro no login:', error);
      handleErrorResponse(res, 500, 'Erro ao realizar o login.');
    }
  },

  /**
   * Cria um novo usuário.
   * @param req A requisição HTTP.
   * @param res A resposta HTTP.
   */
  async createUser(req: Request, res: Response): Promise<void> {
    // Valida os dados da requisição
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      handleErrorResponse(res, 400, `Dados inválidos: ${errorMessages.join('; ')}`);
      return;
    }

    try {
      const { username, email, password } = req.body;
      const user = await UserService.createUser(username, email, password);

      handleSuccessResponse(res, {
        message: 'Usuário criado com sucesso.',
        user: {
          id: (user._id as unknown as { toString(): string }).toString(),
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (error: unknown) {
      // Lidando com erros específicos sem usar 'any'
      if (error instanceof MongoServerError && error.code === 11000) {
        // Erro de chave duplicada (email já existe)
        handleErrorResponse(res, 400, 'Email já cadastrado.');
      } else if (error instanceof Error && 'errors' in error) {
        // Erro de validação do Mongoose
        const validationErrors = Object.values((error as MongooseValidationError).errors).map((err) => err.message);
        res.status(400).json({ error: validationErrors.join('; ') });
      } else {
        // Outros erros
        console.error('[ERROR] Erro ao criar usuário:', error);
        handleErrorResponse(res, 500, 'Erro ao criar usuário.');
      }
    }
  },

  /**
   * Busca um usuário pelo ID.
   * @param req A requisição HTTP.
   * @param res A resposta HTTP.
   */
  async getUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);

      if (!user) {
        handleErrorResponse(res, 404, 'Usuário não encontrado.');
        return;
      }

      handleSuccessResponse(res, {
        id: (user._id as unknown as { toString(): string }).toString(),
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error('[ERROR] Erro ao buscar usuário:', error);
      handleErrorResponse(res, 500, 'Erro ao buscar usuário.');
    }
  },

  /**
   * Atualiza um usuário.
   * @param req A requisição HTTP.
   * @param res A resposta HTTP.
   */
  async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await UserService.updateUser(id, updates);

      if (!updatedUser) {
        handleErrorResponse(res, 404, 'Usuário não encontrado para atualização.');
        return;
      }

      handleSuccessResponse(res, {
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
      console.error('[ERROR] Erro ao atualizar usuário:', error);
      handleErrorResponse(res, 500, 'Erro ao atualizar usuário.');
    }
  },
};

export default AuthController;