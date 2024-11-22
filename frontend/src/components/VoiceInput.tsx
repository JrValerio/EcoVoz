import { useState, useEffect } from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useTranslation } from 'react-i18next';

const VoiceInput = () => {
  const { t } = useTranslation();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [manualResponse, setManualResponse] = useState(''); // Estado para a resposta manual
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error(t('voiceInput.browserNotSupported'));
    }
  }, [browserSupportsSpeechRecognition, t]);

  const handleStartListening = async () => {
    try {
      setIsLoading(true);
      resetTranscript(); // Limpa o transcript anterior
      SpeechRecognition.startListening({
        continuous: true,
        language: 'pt-BR', // Idioma ajustável
      });
    } catch (error) {
      console.error('Erro ao iniciar o reconhecimento de fala:', error);
      alert(t('voiceInput.startError'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  const handleClearTranscript = () => {
    resetTranscript();
    setManualResponse(''); // Limpa também a resposta manual
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Botão para iniciar/parar o reconhecimento de voz */}
      <button
        type="button"
        onClick={listening ? handleStopListening : handleStartListening}
        className={`bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300 ${
          listening ? 'bg-blue-700' : ''
        }`}
        aria-pressed={listening ? 'true' : 'false'}
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="animate-spin">🔄 {t('voiceInput.loading')}</span>
        ) : listening ? (
          t('voiceInput.stop')
        ) : (
          t('voiceInput.start')
        )}
      </button>

      {/* Área de texto para mostrar o transcript ou a mensagem padrão */}
      <p className="mt-4 p-2 border rounded bg-gray-100 w-full" aria-live="polite">
        <strong>{t('voiceInput.youSaid')}:</strong>{' '}
        {transcript || t('voiceInput.noSpeechDetected')}
      </p>

      {/* Campo de entrada para edição manual */}
      <textarea
        value={manualResponse}
        onChange={(e) => setManualResponse(e.target.value)}
        placeholder={t('voiceInput.manualResponsePlaceholder')}
        className="mt-4 p-2 border rounded w-full bg-gray-50 focus:outline-none focus:ring focus:ring-blue-300"
        aria-label={t('voiceInput.manualResponseLabel')}
        rows={4}
      ></textarea>

      {/* Botões para limpar o transcript e resposta manual */}
      <div className="flex space-x-4 mt-4">
        <button
          type="button"
          onClick={handleClearTranscript}
          className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 focus:outline-none focus:ring focus:ring-red-300"
        >
          {t('voiceInput.clear')}
        </button>
      </div>
    </div>
  );
};

export default VoiceInput;
