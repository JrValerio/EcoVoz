import mongoose, { Document, Schema } from 'mongoose';

// Interface do documento Settings
interface ISettings extends Document {
  userId: mongoose.Types.ObjectId; // Relacionamento com o usuário
  theme: 'light' | 'dark'; // Temas permitidos
  language: 'en' | 'pt' | 'es'; // Idiomas suportados
}

// Esquema de configurações do usuário
const SettingsSchema: Schema = new Schema<ISettings>(
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

export default mongoose.model<ISettings>('Settings', SettingsSchema);
