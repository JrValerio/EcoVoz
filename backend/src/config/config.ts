import dotenv from 'dotenv';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

/**
 * Objeto que armazena as configurações da aplicação.
 */
export const config = {
  /**
   * Porta na qual o backend será executado.
   * Valor padrão: 4000.
   */
  port: parseInt(process.env.PORT || '4000', 10),

  /**
   * Chave secreta e tempo de expiração do JWT.
   */
  jwtSecret: process.env.JWT_SECRET || 'defaultsecret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1h',

  /**
   * URI de conexão com o MongoDB.
   */
  mongoUri: process.env.MONGO_URI || 'mongodb+srv://amarovsjr81:nbbjBsSO8xb9ZCMr@ecovoz.ypeem.mongodb.net/?retryWrites=true&w=majority&appName=EcoVoz',

  /**
   * URLs do backend e frontend para CORS e redirecionamentos.
   */
  backendUrl: process.env.BACKEND_URL || 'http://localhost:4000',
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',

  /**
   * Configurações do Google OAuth 2.0.
   */
  googleClientId: process.env.GOOGLE_CLIENT_ID || '',
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  googleRedirectUri: process.env.GOOGLE_REDIRECT_URI || '',

  /**
   * Configuração de internacionalização.
   */
  i18nextNamespace: process.env.I18NEXT_NAMESPACE || 'translation',

  /**
   * Ambiente da aplicação (development, production ou test).
   */
  nodeEnv: process.env.NODE_ENV || 'development',
};

/**
 * Validações para garantir que as variáveis essenciais estejam definidas.
 */
if (!config.mongoUri) {
  console.error('❌ Erro: A variável de ambiente MONGO_URI não está configurada.');
  process.exit(1);
}

if (!config.googleClientId || !config.googleClientSecret || !config.googleRedirectUri) {
  console.warn('⚠️ Aviso: Configurações do Google OAuth não estão completas. Certifique-se de definir GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET e GOOGLE_REDIRECT_URI no .env.');
}
