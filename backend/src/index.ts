import dotenv from 'dotenv';

import app from './app.js';

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Define a porta do servidor, usando a variável de ambiente PORT ou a porta 4000 como padrão
const PORT = process.env.PORT || 4000;

/**
 * Inicia o servidor na porta especificada.
 * Exibe uma mensagem no console informando a porta em que o servidor está rodando.
 */
app.listen(process.env.PORT || 4000, () => {
  console.log(`[INFO] Servidor rodando na porta ${process.env.PORT || 4000}`);
});
