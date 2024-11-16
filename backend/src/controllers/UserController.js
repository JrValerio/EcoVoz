import { validationResult } from 'express-validator';
import UserService from '../services/UserService';
import jwt from 'jsonwebtoken';
const UserController = {
  // Método de login
  async login(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const { email, password } = req.body;
      // Busca o usuário pelo e-mail
      const user = await UserService.getUserByEmail(email);
      if (!user) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }
      // Verifica a senha
      const isPasswordValid = await user.comparePassword(password);
      if (!isPasswordValid) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }
      // Gera o token JWT
      // Gera o token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        { expiresIn: '1h' },
      );
      res.json({
        message: 'Login bem-sucedido',
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  },
  async createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    try {
      const { username, email, password } = req.body;
      const user = await UserService.createUser(username, email, password);
      // Evite enviar senha no response
      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async getUser(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getUserById(id);
      // DTO para enviar apenas os dados necessários
      res.json({
        id: user._id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updates = req.body;
      const updatedUser = await UserService.updateUser(id, updates);
      res.json({
        message: 'Usuário atualizado com sucesso',
        user: {
          id: updatedUser._id,
          username: updatedUser.username,
          email: updatedUser.email,
        },
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      await UserService.deleteUser(id);
      res.json({ message: 'Usuário excluído com sucesso' });
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },
};
export default UserController;
