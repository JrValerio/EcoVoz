import mongoose from 'mongoose';
import User, { IUser } from '../models/User';

class UserService {
  // Criação de usuário (inclui suporte ao Google)
  async createUser(
    username: string,
    email: string,
    password: string | null,
    additionalFields?: Partial<{ googleId: string; picture: string }>
  ): Promise<IUser> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUser = await User.findOne({ email }).session(session);
      if (existingUser) {
        throw new Error('E-mail já está em uso.');
      }

      const userData: Partial<IUser> = {
        username,
        email,
        password,
        ...additionalFields, // Adiciona os campos adicionais (googleId, picture)
      };

      const newUser = new User(userData);
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
  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  // Buscar usuário por ID
  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id).select('-password');
  }

  // Atualizar usuário
  async updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    const user = await User.findById(id);
    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    Object.assign(user, updates);
    await user.save();
    return user;
  }
}

export default new UserService();
