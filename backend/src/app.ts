import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { handle } from 'i18next-http-middleware';
import i18n from './i18n';
import connectDB from './config/database';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import statusRoutes from './routes/status';

dotenv.config();

const app = express();

// Middleware para __dirname em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conecta ao banco de dados
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(handle(i18n));

// Rotas da API
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/status', statusRoutes);

// Rota traduzida de exemplo
app.get('/api/message', (req, res) => {
  const t = req.t;
  res.json({ message: t('welcome') });
});

// Arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

export default app;
