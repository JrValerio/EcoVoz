import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { handle } from 'i18next-http-middleware';
import i18n from './i18n';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import statusRoutes from './routes/status';
import errorMiddleware from './middlewares/errorHandler';

dotenv.config();

// Cria a instância do Express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conecta ao banco de dados
connectDB();

// Middlewares globais
app.use(cors());
app.use(express.json());
app.use(handle(i18n));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/status', statusRoutes);

// Exemplo de rota traduzida
app.get('/api/message', (req, res) => {
  const t = req.t;
  res.json({ message: t('welcome') });
});

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Verifica e serve arquivos estáticos do frontend
const frontendPath = path.join(__dirname, 'frontend/dist');
if (!fs.existsSync(frontendPath)) {
  console.error(`O diretório ${frontendPath} não existe. Certifique-se de executar o build do frontend.`);
} else if (process.env.NODE_ENV === 'development') {
  const frontendDevServer = 'http://localhost:5173';
  app.get('*', (req, res) => {
    res.redirect(frontendDevServer + req.originalUrl);
  });
} else {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
}

// Middleware de tratamento de erros
app.use(errorMiddleware);

export default app;
