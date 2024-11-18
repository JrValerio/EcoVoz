import { useSpeechRecognition } from 'react-speech-recognition';
import SpeechRecognition from 'react-speech-recognition';
import { useState } from 'react';

const VoiceInput = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  if (listening) {
    console.log('Speech recognition is currently listening');
  }

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className="text-red-500">
        O seu navegador não suporta reconhecimento de voz.
      </p>
    );
  }

  const handleStartListening = () => {
    setIsListening(true);
    resetTranscript();
    SpeechRecognition.startListening({ continuous: true, language: 'pt-BR' });
  };

  const handleStopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={() => {
          if (isListening) {
            handleStopListening();
          } else {
            handleStartListening();
          }
        }}
        className={`bg-blue-500 text-white px-4 py-2 rounded ${
          isListening ? 'bg-blue-700' : ''
        }`}
      >
        {isListening ? 'Parar de falar' : 'Falar'}
      </button>
      <p className="mt-4 p-2 border rounded bg-gray-100">
        <strong>Você disse:</strong> {transcript || 'Nenhuma fala detectada.'}
      </p>
      <button
        onClick={resetTranscript}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Limpar Transcrição
      </button>
    </div>
  );
};

export default VoiceInput;
