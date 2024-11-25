import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { handle } from 'i18next-http-middleware';
import WebSocket from 'ws'; // Importar WebSocket para se conectar ao backend Python

import i18n from './i18n.js'; // Configuração da internacionalização
import connectDB from './config/database.js'; // Função para conectar ao banco de dados
import authRoutes from './routes/authRoutes.js'; // Rotas de autenticação
import userRoutes from './routes/userRoutes.js'; // Rotas de usuário
import statusRoutes from './routes/status.js'; // Rotas de status
import errorMiddleware from './middlewares/errorHandler.js'; // Middleware de tratamento de erros
import gestureRoutes from './routes/gestureRoutes.js'; // Importar a rota de gestos

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config();

// Cria a aplicação Express
const app = express();

// Middleware para lidar com JSON
app.use(express.json());

// Obtém o caminho do arquivo atual e o diretório atual
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Arquivo:', __filename);
console.log('Diretório:', __dirname);

// Conecta ao banco de dados
connectDB();

// Middlewares
const allowedOrigins = ['http://127.0.0.1:3000', 'http://localhost:3000'];

app.use(cors({
  origin: function (origin, callback) {
    // Permite qualquer uma das URLs especificadas ou requisições sem origem (ex.: Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
})); // Habilita CORS

app.use(handle(i18n)); // Middleware para internacionalização

// Rotas da API
app.use('/api/auth', authRoutes); // Rotas de autenticação
app.use('/api/users', userRoutes); // Rotas de usuário
app.use('/api/status', statusRoutes); // Rotas de status
app.use('/api/gestures', gestureRoutes); // Usar o roteador de gestos
app.use('/api', gestureRoutes);

// Rota para exibir uma mensagem traduzida
app.get('/api/message', (req, res) => {
  const t = req.t; // Função de tradução fornecida pelo middleware i18next
  res.json({ message: t('welcome') }); // Exibe a mensagem traduzida
});

// Rota de health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' }); // Responde com status "UP"
});

// Nova rota para enviar dados para o backend Python via WebSocket
app.post('/api/gestures', (req, res) => {
  // Conectar ao WebSocket do backend Python
  const ws = new WebSocket('ws://127.0.0.1:8000/ws/gestures');

  // Quando a conexão for aberta
  ws.on('open', () => {
    // Enviar dados para o WebSocket Python (pode ser qualquer dado necessário)
    ws.send(JSON.stringify(req.body));
  });

  // Quando receber uma mensagem do WebSocket Python
  ws.on('message', (data: Buffer) => {
    // Enviar a resposta recebida do backend Python para o cliente original
    res.json({ response: data.toString() });
    console.log(ws); // Fechar a conexão depois de receber a resposta
  });

  // Lidar com erros de WebSocket
  ws.on('error', (err: Error) => {
    console.error('Erro no WebSocket:', err);
    res.status(500).json({ error: 'Erro ao conectar ao backend Python' });
  });
});

// Configuração para servir arquivos estáticos do frontend
const frontendPath = path.join(__dirname, '../frontend/dist'); // Caminho para a pasta 'dist' do frontend

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
