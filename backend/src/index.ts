import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import statusRoutes from './routes/status';
import connectDB from './config/database';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors());
app.use(express.json());

app.use('/api', statusRoutes);

app.get('/', (req, res) => {
  res.send('EcoVoz backend is running');
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
