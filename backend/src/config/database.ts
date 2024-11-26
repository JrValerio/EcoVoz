import mongoose from 'mongoose';
import { config } from './config.js'; 

/**
 * Função para conectar ao banco de dados MongoDB.
 * Gerencia eventos de conexão, reconexão e falha.
 */
const connectDB = async (): Promise<void> => {
  try {
    // Verifica se a URI do MongoDB está configurada
    const mongoUri =
      process.env.NODE_ENV === 'development'
        ? 'mongodb://localhost:27017/ecovoz' // Local
        : process.env.MONGO_URI || 'mongodb://mongo:27017/ecovoz'; // Docker ou produção

    // Configura as opções de conexão
    const options: mongoose.ConnectOptions = {
      autoIndex: true, // Cria índices automaticamente
      connectTimeoutMS: 10000, // Tempo limite para conectar (10 segundos)
      serverSelectionTimeoutMS: 5000, // Tempo limite para encontrar servidores MongoDB
      socketTimeoutMS: 45000, // Tempo limite de inatividade de conexões
    };

    // Tenta conectar ao MongoDB
    await mongoose.connect(config.mongoUri, options);

    console.log(`[${new Date().toISOString()}] ✅ MongoDB conectado com sucesso!`);
  } catch (error) {
    // Em caso de erro, exibe mensagens detalhadas e encerra a aplicação
    console.error(`[${new Date().toISOString()}] ❌ Erro ao conectar ao MongoDB:`, error);
    console.error(`[${new Date().toISOString()}] 🔍 Verifique se a URI do MongoDB está correta: ${config.mongoUri}`);
    process.exit(1); // Encerra o processo
  }

  // Gerencia eventos de conexão para monitoramento contínuo
  mongoose.connection.on('connected', () => {
    console.log(`[${new Date().toISOString()}] ℹ️ Conexão com o MongoDB estabelecida.`);
  });

  mongoose.connection.on('disconnected', () => {
    console.warn(`[${new Date().toISOString()}] ⚠️ Conexão com o MongoDB perdida. Tentando reconectar...`);
  });

  mongoose.connection.on('reconnected', () => {
    console.log(`[${new Date().toISOString()}] ✅ Reconexão com o MongoDB bem-sucedida.`);
  });

  mongoose.connection.on('reconnectFailed', () => {
    console.error(`[${new Date().toISOString()}] ❌ Todas as tentativas de reconexão ao MongoDB falharam.`);
  });

  mongoose.connection.on('error', (err) => {
    console.error(`[${new Date().toISOString()}] ❌ Erro na conexão com o MongoDB:`, err);
  });
};

// Ativa logs detalhados no Mongoose durante o desenvolvimento
if (process.env.NODE_ENV === 'development') {
  mongoose.set('debug', true);
}

export default connectDB;
