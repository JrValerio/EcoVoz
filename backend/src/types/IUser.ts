import { Document, ObjectId } from 'mongoose';

/**
 * Interface que define as propriedades do documento do usuário.
 */
export interface IUser extends Document {
  /** ID do usuário. */
  _id: ObjectId;
  /** Nome de usuário. */
  username: string;
  /** Endereço de email do usuário. */
  email: string;
  /** Senha do usuário (opcional para login com Google). */
  password?: string;
  /** ID do Google para login com Google (opcional). */
  googleId?: string;
  /** URL da imagem de perfil do Google (opcional). */
  picture?: string;
  /** Data e hora da criação do documento. */
  createdAt: Date;
  /** Data e hora da última atualização do documento. */
  updatedAt: Date;
  /**
   * Método para verificar se a senha fornecida corresponde ao hash armazenado no banco de dados.
   * @param password A senha a ser verificada.
   * @returns Promise que resolve com true se as senhas corresponderem, false caso contrário.
   */
  isValidPassword(password: string): Promise<boolean>;
  /**
   * Método para comparar uma senha fornecida com a senha armazenada no banco de dados (opcional).
   * @param password A senha a ser comparada.
   * @returns Promise que resolve com true se as senhas corresponderem, false caso contrário.
   */
  comparePassword?(password: string): Promise<boolean>;
}