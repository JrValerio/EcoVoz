import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

// Interface do documento do usuário
export interface IUser extends Document {
  updatedAt: any;
  createdAt: any;
  username: string;
  email: string;
  password: string | null; // Permite null para usuários com login via Google
  googleId?: string; // ID único do usuário no Google
  picture?: string; // URL da imagem de perfil do Google
  comparePassword(password: string): Promise<boolean>;
}

// Esquema do usuário
const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, // Não obrigatório para usuários do Google
    googleId: { type: String, required: false }, // Adiciona suporte ao Google ID
    picture: { type: String, required: false }, // Adiciona suporte para imagem de perfil
  },
  { timestamps: true }
);

// Middleware para hash de senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (this.isModified('password') && this.password) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Método de comparação de senha
UserSchema.methods.comparePassword = function (password: string): Promise<boolean> {
  if (!this.password) return Promise.resolve(false); // Senha inexistente retorna falso
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
