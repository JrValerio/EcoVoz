import cv2
import asyncio
import numpy as np
from collections import deque
from .video_stream import VideoStream  
from .gesture_recognizer import GestureRecognizer

class VideoProcessor:
    def __init__(self):
        self.video_stream = VideoStream()
        self.gesture_recognizer = GestureRecognizer()
        self.frame_queue = deque(maxlen=5)  # Descarte automático dos frames mais antigos
        self.running = False

    async def start(self):
        # Inicia o streaming de vídeo
        self.video_stream.start()
        self.running = True

        # Executa as tarefas assíncronas para captura e processamento
        await asyncio.gather(
            self.capture_frames(),
            self.process_frames(),
            self.display_video()
        )

    async def capture_frames(self):
        while self.running:
            try:
                frame = self.video_stream.get_frame()
                if frame is not None:
                    # Reduz a resolução do frame para melhorar o desempenho
                    frame = cv2.resize(frame, (320, 240))
                    # Adiciona o frame na fila (deque)
                    self.frame_queue.append(frame)
                await asyncio.sleep(0.01)  # Aguarda 10ms entre cada captura de frame
            except Exception as e:
                print(f"Erro durante a captura dos frames: {e}")

    async def process_frames(self):
        while self.running:
            try:
                if len(self.frame_queue) > 0:
                    frame = self.frame_queue.popleft()  # Pega o frame mais antigo
                    # Reconhece gestos no frame atual
                    recognized_gestures, processed_frame = self.gesture_recognizer.recognize_gesture_from_frame(frame)
                    self.handle_recognized_gestures(recognized_gestures)
                    # Coloca o frame processado de volta para exibição
                    self.frame_queue.append(processed_frame)
                await asyncio.sleep(0.05)  # Reduz a frequência de processamento dos frames
            except Exception as e:
                print(f"Erro durante o processamento dos frames: {e}")

    def handle_recognized_gestures(self, gestures):
        # Aqui podemos definir como tratar os gestos reconhecidos
        if gestures:
            print("Gestos reconhecidos:", gestures)

    async def display_video(self):
        while self.running:
            try:
                if len(self.frame_queue) > 0:
                    frame = self.frame_queue.pop()  # Pega o frame mais recente para exibir
                    if frame is not None:
                        # Exibe o frame com as previsões, se houver
                        cv2.imshow('Video Stream', frame)

                # Verifica se a tecla 'q' foi pressionada para sair
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    await self.stop()
            except Exception as e:
                print(f"Erro durante a exibição do vídeo: {e}")
                await self.stop()

        # Libera recursos da janela de vídeo
        cv2.destroyAllWindows()

    async def stop(self):
        self.running = False
        self.video_stream.stop()
        print("Parando o processamento de vídeo e liberando recursos.")

if __name__ == "__main__":
    processor = VideoProcessor()
    try:
        asyncio.run(processor.start())
    except KeyboardInterrupt:
        asyncio.run(processor.stop())
