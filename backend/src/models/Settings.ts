import mongoose, { Document, Schema } from 'mongoose';

/**
 * Interface que define as propriedades do documento de configurações do usuário.
 */
interface ISettings extends Document {
  /** ID do usuário ao qual as configurações pertencem. */
  userId: mongoose.Types.ObjectId;
  /** Tema da interface do usuário (claro ou escuro). */
  theme: 'light' | 'dark';
  /** Idioma da interface do usuário. */
  language: 'en' | 'pt' | 'es';
}

// Função para validar o ObjectId do usuário
const validateObjectId = (value: string | number | mongoose.Types.ObjectId) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    throw new Error('ID de usuário inválido.');
  }
};

/**
 * Esquema do Mongoose para as configurações do usuário.
 */
const SettingsSchema: Schema = new Schema<ISettings>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: [validateObjectId, 'ID de usuário inválido.'],
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light',
    },
    language: {
      type: String,
      enum: ['en', 'pt', 'es'],
      default: 'en',
    },
  },
  {
    timestamps: true,
  },
);

// Adiciona um índice ao campo userId para otimizar buscas
SettingsSchema.index({ userId: 1 });

/**
 * Função para buscar as configurações de um usuário pelo ID.
 * @param userId ID do usuário.
 * @returns Promise que resolve com as configurações do usuário ou null se não encontrar.
 */
SettingsSchema.statics.findByUserId = async function (
  userId: mongoose.Types.ObjectId,
): Promise<ISettings | null> {
  try {
    const settings = await this.findOne({ userId });
    return settings;
  } catch (error) {
    console.error('[ERROR] Erro ao buscar configurações:', error);
    return null;
  }
};

/**
 * Método para atualizar as configurações de um usuário.
 * @param userId ID do usuário.
 * @param updates Objeto com as configurações a serem atualizadas.
 * @returns Promise que resolve com as configurações atualizadas ou null se não encontrar.
 */
SettingsSchema.statics.updateByUserId = async function (
  userId: mongoose.Types.ObjectId,
  updates: Partial<ISettings>,
): Promise<ISettings | null> {
  try {
    const settings = await this.findOneAndUpdate({ userId }, updates, { new: true });
    return settings;
  } catch (error) {
    console.error('[ERROR] Erro ao atualizar configurações:', error);
    return null;
  }
};

/**
 * Modelo do Mongoose para as configurações do usuário.
 */
export default mongoose.model<ISettings>('Settings', SettingsSchema);