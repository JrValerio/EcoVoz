import mongoose from 'mongoose';
import { config } from './config';

const connectDB = async (): Promise<void> => {
  try {
    if (!config.mongoUri) {
      throw new Error(
        `❌ A variável de ambiente MONGO_URI não está configurada ou é inválida. Valor atual: ${process.env.MONGO_URI || 'não definido'}`,
      );
    }

    await mongoose.connect(config.mongoUri, {
      autoIndex: true, // Cria índices automaticamente
    });

    console.log('✅ MongoDB conectado com sucesso');
  } catch (error: unknown) {
    console.error('❌ Erro ao conectar ao MongoDB:', (error as Error).message);
    console.error('🔍 Verifique se a URI do MongoDB está correta:', config.mongoUri);
    process.exit(1); // Encerra a aplicação em caso de erro crítico
  }

  // Event handlers para monitorar a conexão
  mongoose.connection.on('connected', () => {
    console.log('ℹ️ Conexão com o MongoDB estabelecida.');
  });

  mongoose.connection.on('disconnected', () => {
    console.warn('⚠️ Conexão com o MongoDB perdida. Tentando reconectar...');
  });

  mongoose.connection.on('reconnected', () => {
    console.log('✅ Reconexão com o MongoDB bem-sucedida.');
  });

  mongoose.connection.on('error', (err) => {
    console.error('❌ Erro na conexão com o MongoDB:', err.message);
  });
};

export default connectDB;
