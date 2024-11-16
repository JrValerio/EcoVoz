import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Remove espaços em branco antes/depois
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: {
        validator: (value) => /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(value), // Regex para validar email
        message: 'Por favor, insira um email válido',
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Define o tamanho mínimo da senha
    },
  },
  {
    timestamps: true, // Adiciona automaticamente createdAt e updatedAt
  },
);
// Hook (middleware) para hashear a senha antes de salvar
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Apenas hashea se a senha for modificada
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});
// Método para comparar senhas
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};
export default mongoose.model('User', UserSchema, 'users');
