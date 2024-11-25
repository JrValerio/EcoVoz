import cv2
import threading
from collections import deque
import time
import psutil

class VideoStream:
    def __init__(self, source=0, max_queue_size=5):
        self.capture = cv2.VideoCapture(source)
        if not self.capture.isOpened():
            raise Exception("Erro ao abrir a câmera ou vídeo.")

        self.frame_queue = deque(maxlen=max_queue_size)
        self.running = False
        self.frame_skip_rate = 1
        self.stop_event = threading.Event()

    def start(self):
        self.running = True
        threading.Thread(target=self.update, daemon=True).start()

    def update(self):
        frame_count = 0
        while not self.stop_event.is_set():
            try:
                ret, frame = self.capture.read()
                if not ret:
                    print("Erro ao capturar o frame. Parando o stream.")
                    break

                frame_count += 1
                if frame_count % self.frame_skip_rate != 0:
                    continue

                self.frame_queue.append(frame)

                # Ajustar dinamicamente o frame_skip_rate
                self.adjust_frame_skip_rate()

            except Exception as e:
                print(f"Erro ao capturar e enfileirar o frame: {e}")
                break

    def adjust_frame_skip_rate(self):
        cpu_usage = psutil.cpu_percent()
        if cpu_usage > 70 and self.frame_skip_rate < 5:
            self.frame_skip_rate += 1
        elif cpu_usage < 30 and self.frame_skip_rate > 1:
            self.frame_skip_rate -= 1

    def read(self):
        if len(self.frame_queue) > 0:
            return self.frame_queue.popleft()
        return None

    def stop(self):
        self.stop_event.set()
        self.running = False
        self.capture.release()

    def __del__(self):
        self.stop()

if __name__ == "__main__":
    try:
        video_stream = VideoStream()
        video_stream.start()

        while True:
            frame = video_stream.read()
            if frame is not None:
                cv2.imshow('Video Stream', frame)

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    except Exception as e:
        print(f"Erro durante a inicialização do stream: {e}")

    finally:
        video_stream.stop()
        cv2.destroyAllWindows()
