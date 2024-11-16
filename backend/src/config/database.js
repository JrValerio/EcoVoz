import mongoose from 'mongoose';
import { config } from './config';
const connectDB = async () => {
  try {
    if (!config.mongoUri) {
      throw new Error(
        '❌ A variável de ambiente MONGO_URI não está configurada.',
      );
    }
    await mongoose.connect(config.mongoUri);
    console.log('✅ MongoDB conectado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
};
export default connectDB;
