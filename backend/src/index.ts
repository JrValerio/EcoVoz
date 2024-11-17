import cors from 'cors';
import dotenv from 'dotenv';
import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/database';
import statusRoutes from './routes/status';
import userRoutes from './routes/userRoutes';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Simular __dirname em ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

connectDB();

app.use(cors());
app.use(express.json());

// Rotas da API
app.use('/api/users', userRoutes);
app.use('/api/status', statusRoutes);

// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware executed');
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
