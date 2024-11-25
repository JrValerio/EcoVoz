// src/controllers/gestureController.ts
import { Request, Response } from 'express';
import { createWebSocketConnection } from '../services/websocketService';

// Função para lidar com gestos recebidos via dados JSON
export const processGesture = (req: Request, res: Response) => {
  const ws = createWebSocketConnection('ws://127.0.0.1:8000/ws/gestures');

  ws.on('message', (data) => {
    res.json({ response: data.toString() });
    ws.close();
  });

  ws.on('error', (err) => {
    console.error('Erro no WebSocket:', err);
    res.status(500).json({ error: 'Erro ao conectar ao backend Python' });
  });

  ws.send(JSON.stringify(req.body));
};

// Função para lidar com upload de vídeo e reconhecimento de gestos
export const processVideoGesture = async (req: Request, res: Response): Promise<void> => {
  if (!req.file) {
    res.status(400).json({ error: 'Nenhum arquivo de vídeo foi fornecido.' });
    return;
  }

  const ws = createWebSocketConnection('ws://127.0.0.1:8000/ws/gestures');

  ws.on('message', (data) => {
    res.json({ response: data.toString() });
    ws.close();
  });

  ws.on('error', (err) => {
    console.error('Erro no WebSocket:', err);
    res.status(500).json({ error: 'Erro ao conectar ao backend Python' });
  });

  ws.send(req.file.buffer);
};
