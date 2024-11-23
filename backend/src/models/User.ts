import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

/**
 * Interface que define as propriedades do documento do usuário.
 */
export interface IUser extends Document {
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
  /** Data e hora da última atualização do documento. */
  updatedAt: Date;
  /** Data e hora da criação do documento. */
  createdAt: Date;
  /**
   * Método para comparar uma senha fornecida com a senha armazenada no banco de dados.
   * @param password A senha a ser comparada.
   * @returns Promise que resolve com true se as senhas corresponderem, false caso contrário.
   */
  comparePassword(password: string): Promise<boolean>;
}

/**
 * Esquema do Mongoose para o usuário.
 */
const UserSchema: Schema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    googleId: { type: String },
    picture: { type: String },
  },
  { timestamps: true },
);

/**
 * Middleware que realiza o hash da senha antes de salvar o usuário no banco de dados.
 */
/**
 * Middleware que realiza o hash da senha antes de salvar o usuário no banco de dados.
 */
UserSchema.pre('save', async function (next) {
  // Afirmação de tipo para this.password como string dentro do middleware
  const password = this.password as string; 

  if (this.isModified('password') && password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(password, salt);
  }
  next();
});

/**
 * Método para comparar uma senha fornecida com a senha armazenada no banco de dados.
 */
UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  // Afirmação de tipo para this.password como string dentro do método
  const hashedPassword = this.password as string; 

  if (!hashedPassword) return false;
  return bcrypt.compare(password, hashedPassword);
};

/**
 * Modelo do Mongoose para o usuário.
 */
const User = mongoose.model<IUser>('User', UserSchema);
export default User;