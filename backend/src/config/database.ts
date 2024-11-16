import mongoose from 'mongoose';
import { config } from './config';

const connectDB = async (): Promise<void> => {
  try {
    if (!config.mongoUri) {
      throw new Error(
        '❌ A variável de ambiente MONGO_URI não está configurada.',
      );
    }

    await mongoose.connect(config.mongoUri);

    console.log('✅ MongoDB conectado com sucesso');
  } catch (error: unknown) {
    console.error('❌ Erro ao conectar ao MongoDB:', (error as Error).message);
    process.exit(1);
  }
};
export default connectDB;
