import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/database';
import userRoutes from './routes/userRoutes';
import statusRoutes from './routes/status';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/status', statusRoutes);

// Rota principal
app.get('/', (req, res) => {
  res.send('EcoVoz backend is running');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
