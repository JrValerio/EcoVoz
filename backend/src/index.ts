import cors from 'cors';
import dotenv from 'dotenv';
<<<<<<< HEAD
import express, { Request, Response, NextFunction } from 'express';
import { fileURLToPath } from 'url';
=======
import express from 'express';
>>>>>>> c5eaf2d2f34e4ab998d3b5749b22a754c50f7ee0
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

app.get('/', (req: Request, res: Response) => {
  res.send('EcoVoz backend is running');
});

<<<<<<< HEAD
// Servir arquivos estáticos
app.use(express.static(path.join(__dirname, 'frontend/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist', 'index.html'));
});

// Middleware de logging
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Middleware executed');
  next();
=======
app.use(express.static(path.join(__dirname, "frontend/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
>>>>>>> c5eaf2d2f34e4ab998d3b5749b22a754c50f7ee0
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
