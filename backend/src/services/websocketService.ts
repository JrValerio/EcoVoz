// src/services/websocketService.ts
import WebSocket from 'ws';

export const createWebSocketConnection = (url: string): WebSocket => {
  const ws = new WebSocket(url);

  ws.on('open', () => {
    console.log(`Conectado ao WebSocket: ${url}`);
  });

  ws.on('close', () => {
    console.log(`Conexão com o WebSocket: ${url} foi fechada`);
  });

  return ws;
};
