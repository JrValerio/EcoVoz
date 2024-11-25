import cv2
import asyncio
import numpy as np
import base64
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from services.middleware_cors import setup_cors
import uvicorn
import logging

# Configuração do log
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# Criação da instância da aplicação FastAPI
app = FastAPI()

# Configuração do middleware CORS
setup_cors(app)

# Importação dinâmica dentro da função para evitar problemas de circularidade
@app.on_event("startup")
async def startup_event():
    global gesture_recognizer
    from server.gesture_recognizer import GestureRecognizer
    gesture_recognizer = GestureRecognizer()

# Definir uma rota simples para testar
@app.get("/")
def read_root():
    return {"message": "Servidor FastAPI está funcionando!"}

# WebSocket para reconhecimento de gestos em vídeo
@app.websocket("/ws/gestures")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    logging.info("Cliente conectado ao WebSocket.")

    try:
        while True:
            try:
                # Receber dados (frames) do WebSocket
                data = await websocket.receive_text()
                
                # Validação de dados recebidos
                if not data:
                    logging.warning("Dados recebidos estão vazios. Ignorando este frame.")
                    continue

                # Converter dados de base64 para uma imagem OpenCV
                try:
                    image_data = base64.b64decode(data)
                    nparr = np.frombuffer(image_data, np.uint8)
                    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
                except Exception as e:
                    logging.error(f"Erro ao decodificar o frame: {e}")
                    continue

                # Verificar se a imagem foi corretamente convertida
                if frame is None:
                    logging.error("Erro: Frame recebido não é válido.")
                    continue

                # Reconhecer gestos no frame capturado
                gestures, _ = gesture_recognizer.recognize_gesture_from_frame(frame)
                
                # Enviar gestos reconhecidos ao cliente via WebSocket
                await websocket.send_text(f"Gestos reconhecidos: {gestures}")

            except WebSocketDisconnect:
                logging.info("Cliente desconectado do WebSocket.")
                break
            except Exception as e:
                logging.error(f"Erro ao processar o frame: {e}")
                continue

    except WebSocketDisconnect:
        logging.info("Cliente desconectado.")
    except Exception as e:
        logging.error(f"Ocorreu um erro inesperado no WebSocket: {e}")
    finally:
        await websocket.close()
        logging.info("Conexão WebSocket encerrada.")

# Função para iniciar o servidor FastAPI
def start_server():
    # Observação: Em produção, considere usar SSL para WebSockets.
    uvicorn.run(app, host="127.0.0.1", port=8000)

# Iniciar o servidor
if __name__ == "__main__":
    start_server()
