import { Request, Response } from 'express';
import WebSocket from 'ws';

/**
 * Processa o vídeo enviado pelo cliente.
 * O vídeo é enviado para o backend Python via WebSocket para detecção de gestos.
 */
export const processVideo = (req: Request, res: Response) => {
  // Verifica se um arquivo foi enviado
  if (!req.file || !req.file.buffer) {
    return res.status(400).json({ error: 'Nenhum arquivo de vídeo foi fornecido.' });
  }

  // Criando uma nova conexão WebSocket com o backend Python
  const ws = new WebSocket('ws://127.0.0.1:8000/ws/gestures');

  // Quando o WebSocket estiver aberto, envie os dados do vídeo
  ws.on('open', () => {
    console.log('Conectado ao WebSocket do backend Python');
    // Envia os dados do vídeo em Buffer
    ws.send((req.file as any).buffer);
  });

  // Recebe a resposta do backend Python
  ws.on('message', (data) => {
    console.log('Resposta recebida do backend Python:', data);
    // Envia a resposta para o cliente
    res.json({ response: data.toString() });

    // Fecha o WebSocket após receber a resposta
    ws.close();
  });

  // Lida com o fechamento do WebSocket
  ws.on('close', () => {
    console.log('WebSocket fechado pelo backend Python');
  });

  // Lida com erros de WebSocket
  ws.on('error', (err) => {
    console.error('Erro no WebSocket:', err);
    res.status(500).json({ error: 'Erro ao conectar ao backend Python' });
  });
};
