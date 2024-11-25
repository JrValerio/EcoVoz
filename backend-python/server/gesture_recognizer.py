import mediapipe as mp
import numpy as np
import cv2
from typing import List, Tuple

class GestureRecognizer:
    def __init__(self):
        # Inicializando o MediaPipe Hands, que será utilizado para reconhecer landmarks
        self.mp_hands = mp.solutions.hands
        self.mp_drawing = mp.solutions.drawing_utils
        self.hand_detector = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.7,  # Ajuste para melhorar a precisão
            min_tracking_confidence=0.7
        )

    def extract_landmarks(self, hand_results) -> List[List[Tuple[float, float, float]]]:
        """
        Extrai os landmarks das mãos detectadas.
        """
        all_landmarks = []
        if hand_results.multi_hand_landmarks:
            for hand_landmarks in hand_results.multi_hand_landmarks:
                single_hand_landmarks = [(lm.x, lm.y, lm.z) for lm in hand_landmarks.landmark]
                all_landmarks.append(single_hand_landmarks)
        return all_landmarks

    def detect_gesture(self, landmarks: List[List[Tuple[float, float, float]]]) -> List[str]:
        """
        Detecta gestos simples com base nos landmarks.
        """
        gestures = []
        for hand in landmarks:
            if len(hand) == 21:  # Confere se todos os 21 pontos da mão foram detectados
                thumb_tip = hand[4]  # Polegar
                index_finger_tip = hand[8]  # Indicador
                middle_finger_tip = hand[12]  # Médio
                ring_finger_tip = hand[16]  # Anelar
                pinky_tip = hand[20]  # Mínimo
                
                # Reconhecimento de alguns gestos
                if thumb_tip[1] < index_finger_tip[1] and thumb_tip[1] < pinky_tip[1]:
                    gestures.append('joinha')  # Polegar para cima
                elif (index_finger_tip[1] < thumb_tip[1] and 
                      pinky_tip[1] < thumb_tip[1] and
                      middle_finger_tip[1] < thumb_tip[1] and
                      ring_finger_tip[1] < thumb_tip[1]):
                    gestures.append('mão aberta')  # Mão aberta (todos os dedos para cima)
                elif index_finger_tip[1] < thumb_tip[1] and pinky_tip[1] < thumb_tip[1]:
                    gestures.append('paz e amor')  # Sinal de paz e amor
                elif index_finger_tip[1] < middle_finger_tip[1] and thumb_tip[1] < ring_finger_tip[1]:
                    gestures.append('ok')  # Sinal "OK" (polegar e indicador formando um círculo)
                else:
                    gestures.append('desconhecido')
        return gestures

    def recognize_gesture_from_frame(self, frame, draw_landmarks=True):
        """
        Reconhece o gesto em um frame.
        """
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        hand_results = self.hand_detector.process(frame_rgb)

        # Desenhar landmarks no frame para facilitar a depuração
        if hand_results.multi_hand_landmarks and draw_landmarks:
            for hand_landmarks in hand_results.multi_hand_landmarks:
                self.mp_drawing.draw_landmarks(
                    frame,
                    hand_landmarks,
                    self.mp_hands.HAND_CONNECTIONS,
                    self.mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2, circle_radius=2),
                    self.mp_drawing.DrawingSpec(color=(255, 0, 0), thickness=2)
                )

        landmarks = self.extract_landmarks(hand_results)
        gestures = self.detect_gesture(landmarks)
        return gestures, frame
