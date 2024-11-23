import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { handle } from 'i18next-http-middleware';

import i18n from './i18n'; // Configuração da internacionalização
import connectDB from './config/database'; // Função para conectar ao banco de dados
import authRoutes from './routes/authRoutes'; // Rotas de autenticação
import userRoutes from './routes/userRoutes'; // Rotas de usuário
import statusRoutes from './routes/status'; // Rotas de status
import errorMiddleware from './middlewares/errorHandler'; // Middleware de tratamento de erros

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a aplicação Express
const app = express();

// Obtém o caminho do arquivo atual e o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conecta ao banco de dados
connectDB();

// Middlewares
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite o parsing de JSON no corpo das requisições
app.use(handle(i18n)); // Middleware para internacionalização

// Rotas da API
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/users', userRoutes); // Rotas de usuário
app.use('/api/status', statusRoutes); // Rotas de status

// Rota para exibir uma mensagem traduzida
app.get('/api/message', (req, res) => {
  const t = req.t; // Função de tradução fornecida pelo middleware i18next
  res.json({ message: t('welcome') }); // Exibe a mensagem traduzida
});

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' }); // Responde com status "UP"
});

// Configuração para servir arquivos estáticos do frontend
const frontendPath = path.join(__dirname, 'frontend/dist'); // Caminho para a pasta 'dist' do frontend

// Verifica se a pasta 'dist' do frontend existe
if (fs.existsSync(frontendPath)) {
  // Em produção, serve os arquivos estáticos do frontend
  app.use(express.static(frontendPath));

  // Redireciona todas as rotas para o index.html para que o React Router funcione corretamente
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
} else {
  // Em desenvolvimento, redireciona para o servidor de desenvolvimento do frontend
  const frontendDevServer = 'http://localhost:5173'; // URL do servidor de desenvolvimento
  console.log(`[INFO] Redirecionando para o servidor de desenvolvimento do frontend: ${frontendDevServer}`);

  // Redireciona todas as rotas para o servidor de desenvolvimento do frontend
  app.get('*', (req, res) => {
    res.redirect(frontendDevServer + req.originalUrl);
  });
}

// Middleware de tratamento de erros (deve ser o último middleware)
app.use(errorMiddleware);

export default app;