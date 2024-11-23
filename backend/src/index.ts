import dotenv from 'dotenv';
import app from './app';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Define a porta do servidor, usando a variável de ambiente PORT ou a porta 4000 como padrão
const PORT = process.env.PORT || 4000;

/**
 * Inicia o servidor na porta especificada.
 * Exibe uma mensagem no console informando a porta em que o servidor está rodando.
 */
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
});