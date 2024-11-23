import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Objeto que armazena as configurações da aplicação.
 */
export const config = {
  // URI do MongoDB
  mongoUri: process.env.MONGO_URI || '', 

  // Porta do servidor
  port: parseInt(process.env.PORT || '4000', 10), 

  // Chave secreta para assinatura de tokens JWT
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret', 

};