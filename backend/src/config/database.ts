import mongoose from 'mongoose';

import { config } from './config.js';

/**
 * Função para conectar ao banco de dados MongoDB.
 */
const connectDB = async (): Promise<void> => {
  try {
    // Verifica se a URI do MongoDB está configurada
    if (!config.mongoUri) {
      throw new Error(
        `❌ A variável de ambiente MONGO_URI não está configurada ou é inválida. Valor atual: ${config.mongoUri}`,
      );
    }

    // Tenta conectar ao MongoDB com a URI especificada
    await mongoose.connect(config.mongoUri, {
      autoIndex: true, // Cria índices automaticamente para melhorar a performance das consultas
    });

    console.log('✅ MongoDB conectado com sucesso!');
  } catch (error) {
    // Em caso de erro, exibe mensagens de erro no console e encerra a aplicação
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    console.error('🔍 Verifique se a URI do MongoDB está correta:', config.mongoUri);
    process.exit(1); 
  }

  // Define event listeners para monitorar o estado da conexão com o MongoDB
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
    console.error('❌ Erro na conexão com o MongoDB:', err);
  });
};

export default connectDB;