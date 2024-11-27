import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const GestureRecognition: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [gesture, setGesture] = useState<string>(''); // Será traduzido com `t`
  const ws = useRef<WebSocket | null>(null);
  const [isVideoRunning, setIsVideoRunning] = useState<boolean>(false);
  let frameInterval: NodeJS.Timeout | null = null;

  const { t } = useTranslation(); // Hook para tradução

  useEffect(() => {
    setGesture(t('gestureRecognition.waiting')); // Define o estado inicial traduzido

    const websocketUrl = 'ws://127.0.0.1:8000/ws/gestures';

    const connectWebSocket = () => {
      ws.current = new WebSocket(websocketUrl);

      ws.current.onopen = () => {
        console.log(t('gestureRecognition.websocketConnected'));
        setIsConnected(true);
      };

      ws.current.onmessage = (event) => {
        console.log(t('gestureRecognition.websocketMessage'), event.data);
        setGesture(event.data);
      };

      ws.current.onclose = () => {
        console.log(t('gestureRecognition.websocketDisconnected'));
        setIsConnected(false);
        setTimeout(connectWebSocket, 2000);
      };

      ws.current.onerror = (error) => {
        console.error(t('gestureRecognition.websocketError'), error);
      };
    };

    connectWebSocket();

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [t]);

  const startVideo = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        const sendFrames = () => {
          if (
            videoRef.current &&
            ws.current &&
            ws.current.readyState === WebSocket.OPEN
          ) {
            const canvas = document.createElement('canvas');
            canvas.width = 320;
            canvas.height = 240;
            const context = canvas.getContext('2d');
            if (context) {
              context.drawImage(
                videoRef.current,
                0,
                0,
                canvas.width,
                canvas.height,
              );
              const frameData = canvas.toDataURL('image/jpeg');
              ws.current.send(frameData);
            }
          }
        };

        frameInterval = setInterval(sendFrames, 200);
        setIsVideoRunning(true);
      }
    } catch (err) {
      console.error(t('gestureRecognition.cameraError'), err);
    }
  };

  const stopVideo = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      (videoRef.current.srcObject as MediaStream)
        .getTracks()
        .forEach((track) => track.stop());
    }
    if (frameInterval) {
      clearInterval(frameInterval);
      frameInterval = null;
    }
    setIsVideoRunning(false);
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      if (frameInterval) {
        clearInterval(frameInterval);
        frameInterval = null;
      }
      setIsVideoRunning(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-lg border border-gray-300 dark:border-gray-600">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
          {t('gestureRecognition.title')}
        </h1>
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full h-auto rounded-md mb-6 border-2 border-gray-300 dark:border-gray-600"
        >
          <track kind="captions" srcLang="pt" src="path/to/captions.vtt" />
        </video>
        <div className="flex justify-between mb-4">
          <button
            onClick={startVideo}
            disabled={isVideoRunning}
            className="px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-md hover:bg-blue-700 dark:hover:bg-blue-800"
          >
            {t('gestureRecognition.startVideo')}
          </button>
          <button
            onClick={pauseVideo}
            disabled={!isVideoRunning}
            className="px-4 py-2 bg-yellow-500 dark:bg-yellow-600 text-white rounded-md hover:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            {t('gestureRecognition.pauseVideo')}
          </button>
          <button
            onClick={stopVideo}
            className="px-4 py-2 bg-red-500 dark:bg-red-600 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-700"
          >
            {t('gestureRecognition.stopVideo')}
          </button>
        </div>
        <div className="mb-4 text-center">
          {isConnected ? (
            <span className="text-green-500 dark:text-green-400">
              {t('gestureRecognition.connected')}
            </span>
          ) : (
            <span className="text-red-500 dark:text-red-400">
              {t('gestureRecognition.disconnected')}
            </span>
          )}
        </div>
        <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-md text-center mb-4">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            {gesture}
          </span>
        </div>
        <textarea
          value={gesture}
          readOnly
          aria-label={t('gestureRecognition.gestureInput')}
          className="w-full p-2 border rounded-md text-gray-900 dark:text-gray-100 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600"
          rows={4}
        />
      </div>
    </div>
  );
};

export default GestureRecognition;
