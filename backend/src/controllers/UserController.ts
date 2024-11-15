import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';

const UserController = {
  // Método para criar um novo usuário
  async createUser(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      // Verifica se o e-mail já está em uso
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'E-mail já está em uso' });
      }

      // Criptografa a senha antes de salvar
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });

      await newUser.save();

      res.status(201).json({ message: 'Usuário criado com sucesso' });
    } catch {
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  },

  // Método para buscar um usuário específico por ID
  async getUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const user = await User.findById(id).select('-password'); // Exclui a senha

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json(user);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar usuário' });
    }
  },

  // Método para atualizar informações de um usuário específico
  async updateUser(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { username, email, password } = req.body;

      // Verifica se o usuário existe
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      // Atualiza os campos permitidos
      if (username) user.username = username;
      if (email) user.email = email;
      if (password) user.password = await bcrypt.hash(password, 10);

      await user.save();

      res.json({ message: 'Usuário atualizado com sucesso' });
    } catch {
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  },

  // Método para excluir um usuário específico
  async deleteUser(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const user = await User.findByIdAndDelete(id);

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      res.json({ message: 'Usuário excluído com sucesso' });
    } catch {
      res.status(500).json({ error: 'Erro ao excluir usuário' });
    }
  },

  // Método para login e geração de token JWT
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      // Verifica se o e-mail existe
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ error: 'Credenciais inválidas' });
      }

      // Verifica a senha
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ error: 'Credenciais inválidas' });
      }

      // Gera o token JWT
      const token = jwt.sign(
        { userId: user._id },
        process.env.JWT_SECRET || 'default_secret',
        {
          expiresIn: '1h', // O token expira em 1 hora
        }
      );

      res.json({ message: 'Login bem-sucedido', token });
    } catch {
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  },
};

export default UserController;
