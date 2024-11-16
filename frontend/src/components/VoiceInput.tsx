import { useSpeechRecognition } from 'react-speech-recognition';
import { useState } from 'react';

const VoiceInput = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(false);

  const handleStartListening = () => {
    setIsListening(true);
    resetTranscript();
  };

  const handleStopListening = () => {
    setIsListening(false);
  };

  return (
    <div>
      <button
        onMouseDown={handleStartListening}
        onMouseUp={handleStopListening}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {isListening ? 'Parar de falar' : 'Segure para falar'}
      </button>
      <p>Você disse: {transcript}</p>
    </div>
  );
};
