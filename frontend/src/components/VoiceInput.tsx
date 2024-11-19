import { useSpeechRecognition } from 'react-speech-recognition';
import SpeechRecognition from 'react-speech-recognition';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const VoiceInput = () => {
  const { t } = useTranslation();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();
  const [isListening, setIsListening] = useState(listening);
  const [isLoading, setIsLoading] = useState(false);

  if (!browserSupportsSpeechRecognition) {
    return (
      <div className="flex flex-col items-center">
        <p className="text-red-500">{t('voiceInput.browserNotSupported')}</p>
        <textarea
          placeholder={t('voiceInput.manualInput')}
          className="mt-2 p-2 border rounded w-full bg-gray-100"
          aria-label={t('voiceInput.manualInputLabel')}
        />
      </div>
    );
  }

  const handleStartListening = async () => {
    try {
      setIsLoading(true);
      resetTranscript();
      await SpeechRecognition.startListening({
        continuous: true,
        language: 'pt-BR',
      });
      setIsListening(true);
    } catch (error) {
      console.error('Erro ao iniciar o reconhecimento de fala:', error);
      alert(t('voiceInput.startError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopListening = async () => {
    try {
      await SpeechRecognition.stopListening();
      setIsListening(false);
    } catch (error) {
      console.error('Erro ao parar o reconhecimento de fala:', error);
      alert(t('voiceInput.stopError'));
    }
  };

  const handleClearTranscript = () => {
    resetTranscript();
  };

  return (
    <div className="flex flex-col items-center">
      <button
        type="button"
        onClick={() => {
          if (isListening) {
            handleStopListening();
          } else {
            handleStartListening();
          }
        }}
        className={`bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${
          isListening ? 'bg-blue-700' : ''
        }`}
        aria-pressed={isListening ? 'true' : 'false'}
        aria-busy={isLoading ? 'true' : 'false'}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin">🔄 {t('voiceInput.loading')}</span>
        ) : isListening ? (
          t('voiceInput.stop')
        ) : (
          t('voiceInput.start')
        )}
      </button>
      <p
        className="mt-4 p-2 border rounded bg-gray-100"
        aria-live="polite"
      >
        <strong>{t('voiceInput.youSaid')}:</strong>{' '}
        {transcript || t('voiceInput.noSpeechDetected')}
      </p>
      <button
        type="button"
        onClick={handleClearTranscript}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        aria-label={t('voiceInput.clear')}
      >
        {t('voiceInput.clear')}
      </button>
    </div>
  );
};

export default VoiceInput;
