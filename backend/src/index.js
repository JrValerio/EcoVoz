import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';
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
app.use('/api/users', userRoutes);
app.use('/api/status', statusRoutes);
app.get('/', (req, res) => {
  res.send('EcoVoz backend is running');
});
// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend/dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});
// Middleware de logging
app.use((req, res, next) => {
  console.log('Middleware executed');
  next();
});
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
