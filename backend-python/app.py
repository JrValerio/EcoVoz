import cv2
import asyncio
import numpy as np
import base64
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import logging
import os
import tensorflow as tf

# Suprime logs de aviso e informações do TensorFlow
os.environ["TF_CPP_MIN_LOG_LEVEL"] = "2"

# Configuração do log
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Instância da aplicação FastAPI
app = FastAPI()

# Configuração do middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Ajuste conforme necessário para produção
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Variáveis globais
gesture_recognizer = None
last_frame_time = 0

# Inicialização do servidor
@app.on_event("startup")
async def startup_event():
    global gesture_recognizer
    logging.info("Inicializando reconhecimento de gestos...")
    try:
        from server.gesture_recognizer import GestureRecognizer
        gesture_recognizer = GestureRecognizer()
        logging.info("Reconhecimento de gestos inicializado com sucesso.")
    except ImportError as e:
        logging.error(f"Erro ao importar GestureRecognizer: {e}")
        raise e

# Rota principal para teste de API
@app.get("/")
def read_root():
    return {"message": "Servidor FastAPI está funcionando!"}

# Health Check
@app.get("/health")
def health_check():
    return {"status": "ok"}

# WebSocket para reconhecimento de gestos
@app.websocket("/ws/gestures")
async def websocket_endpoint(websocket: WebSocket):
    global last_frame_time
    await websocket.accept()
    logging.info("Cliente conectado ao WebSocket.")

    try:
        while True:
            current_time = asyncio.get_event_loop().time()
            # Controle de taxa de quadros
            if current_time - last_frame_time < 0.1:
                await asyncio.sleep(0.1)
                continue
            last_frame_time = current_time

            try:
                data = await websocket.receive_text()
                if not data:
                    logging.warning("Frame vazio recebido. Ignorado.")
                    continue

                # Decodificar frame
                try:
                    image_data = base64.b64decode(data)
                    nparr = np.frombuffer(image_data, np.uint8)
                    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

                    if frame is None or frame.size == 0:
                        logging.error("Frame recebido é inválido.")
                        continue
                except Exception as e:
                    logging.error(f"Erro ao decodificar frame: {e}")
                    continue

                # Reconhecer gestos
                try:
                    gestures, _ = await asyncio.to_thread(gesture_recognizer.recognize_gesture_from_frame, frame)
                    await websocket.send_text(f"Gestos reconhecidos: {gestures}")
                except Exception as e:
                    logging.error(f"Erro ao reconhecer gestos: {e}")
                    await websocket.send_text("Erro ao reconhecer gestos. Tente novamente.")
                    continue

            except WebSocketDisconnect:
                logging.info("Cliente desconectado do WebSocket.")
                break
            except Exception as e:
                logging.error(f"Erro ao processar frame: {e}")
                continue
    finally:
        await websocket.close()
        logging.info("Conexão WebSocket encerrada.")

# Função para iniciar o servidor
def start_server():
    logging.info("Iniciando servidor...")
    uvicorn.run(app, host="0.0.0.0", port=8000)

if __name__ == "__main__":
    start_server()
