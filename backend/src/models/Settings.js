import mongoose, { Schema } from 'mongoose';
// Esquema de configurações do usuário
const SettingsSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true, // O userId é obrigatório
    },
    theme: {
      type: String,
      enum: ['light', 'dark'], // Limita os valores permitidos
      default: 'light', // Valor padrão
    },
    language: {
      type: String,
      enum: ['en', 'pt', 'es'], // Idiomas suportados
      default: 'en', // Valor padrão
    },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  },
);
export default mongoose.model('Settings', SettingsSchema);
