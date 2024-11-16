import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import User from '../models/User';

class UserService {
  // Criação de novo usuário
  async createUser(username: string, email: string, password: string) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUser = await User.findOne({ email }).session(session);
      if (existingUser) {
        throw new Error('E-mail já está em uso');
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({ username, email, password: hashedPassword });
      await newUser.save({ session });

      await session.commitTransaction();
      return newUser;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  // Busca um usuário pelo e-mail
  async getUserByEmail(email: string) {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  // Buscar usuário por ID
  async getUserById(id: string) {
    const user = await User.findById(id).select('-password');
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }

  // Atualizar usuário
  async updateUser(
    id: string,
    updates: Partial<{ username: string; email: string; password: string }>,
  ) {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    if (updates.username) user.username = updates.username;
    if (updates.email) user.email = updates.email;
    if (updates.password)
      user.password = await bcrypt.hash(updates.password, 10);

    await user.save();
    return user;
  }

  // Excluir usuário
  async deleteUser(id: string) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new Error('Usuário não encontrado');
    }
    return user;
  }
}

export default new UserService();
