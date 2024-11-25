import { Request, Response } from 'express';
import WebSocket from 'ws';

/**
 * Processa o vídeo enviado pelo cliente.
 * O vídeo é enviado para o backend Python via WebSocket para detecção de gestos.
 */
export const processVideo = (req: Request, res: Response) => {
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'Nenhum arquivo de vídeo foi fornecido.' });
  }

  const ws = new WebSocket('ws://127.0.0.1:8000/ws/gestures');
  let isResponseSent = false;

  const timeout = setTimeout(() => {
    if (!isResponseSent) {
      isResponseSent = true;
      console.error('Timeout ao conectar ao backend Python');
      res.status(504).json({ error: 'Timeout ao conectar ao backend Python' });
      console.log(ws);
    }
  }, 10000); // 10 segundos

  ws.on('open', () => {
      console.log('Conectado ao WebSocket do backend Python');
      clearTimeout(timeout);
      if (req.file && req.file.buffer) {
          ws.send(req.file.buffer);
      } else {
          console.error('Nenhum arquivo de vídeo foi fornecido.');
          res.status(400).json({ error: 'Nenhum arquivo de vídeo foi fornecido.' });
      }
  });

  ws.on('message', (event: MessageEvent) => {
    const data = event.data;
    if (!isResponseSent) {
      isResponseSent = true;
      console.log('Resposta recebida do backend Python:', data);
      res.json({ response: data.toString() });
      console.log(ws);
    }
  });

  ws.on('error', (err: Error) => {
    if (!isResponseSent) {
      isResponseSent = true;
      console.error('Erro no WebSocket:', err);
      res.status(500).json({ error: 'Erro ao conectar ao backend Python' });
    }
  });

  ws.on('close', () => {
    console.log('WebSocket fechado pelo backend Python');
  });
};
