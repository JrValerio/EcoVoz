import mongoose from 'mongoose';
import User, { IUser } from '../models/User';

/**
 * Classe que fornece serviços relacionados ao usuário.
 */
class UserService {
  /**
   * Cria um novo usuário no banco de dados.
   * @param username Nome de usuário.
   * @param email Endereço de email.
   * @param password Senha do usuário (opcional para login com Google).
   * @param additionalFields Campos adicionais, como googleId e picture (opcional).
   * @returns Promise que resolve com o usuário criado.
   */
  async createUser(
    username: string,
    email: string,
    password?: string, 
    additionalFields?: Partial<{ googleId: string; picture: string }>,
  ): Promise<IUser> {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const existingUser = await User.findOne({ email }).session(session);
      if (existingUser) {
        throw new Error('E-mail já está em uso.');
      }

      const newUser = new User({
        username,
        email,
        password,
        ...additionalFields,
      });

      await newUser.save({ session });
      await session.commitTransaction();
      console.log(`[SUCCESS] Usuário criado: ${newUser}`);
      return newUser;
    } catch (error) {
      console.error('[ERROR] Erro ao criar usuário:', error);
      await session.abortTransaction();
      throw error; 
    } finally {
      session.endSession();
    }
  }

  /**
   * Busca um usuário pelo email.
   * @param email Endereço de email do usuário.
   * @returns Promise que resolve com o usuário encontrado ou null se não encontrar.
   */
  async getUserByEmail(email: string): Promise<IUser | null> {
    return User.findOne({ email });
  }

  /**
   * Busca um usuário pelo ID.
   * @param id ID do usuário.
   * @returns Promise que resolve com o usuário encontrado ou null se não encontrar.
   */
  async getUserById(id: string): Promise<IUser | null> {
    return User.findById(id).select('-password');
  }

  /**
   * Atualiza um usuário.
   * @param id ID do usuário.
   * @param updates Objeto com as propriedades a serem atualizadas.
   * @returns Promise que resolve com o usuário atualizado ou null se não encontrar.
   */
  async updateUser(id: string, updates: Partial<IUser>): Promise<IUser | null> {
    try {
      const user = await User.findById(id);
      if (!user) {
        throw new Error('Usuário não encontrado.');
      }

      Object.assign(user, updates);
      await user.save();
      console.log(`[SUCCESS] Usuário atualizado: ${user}`);
      return user;
    } catch (error) {
      console.error('[ERROR] Erro ao atualizar usuário:', error);
      throw error; 
    }
  }
}

export default new UserService();