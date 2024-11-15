import mongoose, { Document, Schema } from 'mongoose';

interface ISettings extends Document {
  userId: mongoose.Types.ObjectId; // Relacionamento com o usuário
  theme: string; // Exemplo de preferência
  language: string;
}

const SettingsSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  theme: { type: String, default: 'light' },
  language: { type: String, default: 'en' },
});

export default mongoose.model<ISettings>('Settings', SettingsSchema);
