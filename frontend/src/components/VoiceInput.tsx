import { useState, useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useTranslation } from 'react-i18next';

/**
 * Componente de entrada de voz que permite ao usuário interagir com a aplicação usando comandos de voz.
 *
 * O componente exibe um botão para iniciar e parar a escuta,
 * uma área de texto para exibir a transcrição da fala do usuário,
 * um campo de texto para entrada manual e um botão para limpar a transcrição.
 */
const VoiceInput = () => {
  const { t } = useTranslation();

  // Hook para usar o reconhecimento de voz
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [manualResponse, setManualResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Verifica se o navegador suporta reconhecimento de voz
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      console.error(t('voiceInput.browserNotSupported'));
    }
  }, [browserSupportsSpeechRecognition, t]);

  /**
   * Inicia o reconhecimento de voz.
   */
  const handleStartListening = async () => {
    try {
      setIsLoading(true);
      resetTranscript();
      SpeechRecognition.startListening({
        continuous: true,
        lang: 'pt-BR',
      });
    } catch (error) {
      console.error('Erro ao iniciar o reconhecimento de fala:', error);
      alert(t('voiceInput.startError'));
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Para o reconhecimento de voz.
   */
  const handleStopListening = () => {
    SpeechRecognition.stopListening();
  };

  /**
   * Limpa a transcrição e a resposta manual.
   */
  const handleClearTranscript = () => {
    resetTranscript();
    setManualResponse('');
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
      <p
        className="mt-4 p-2 border rounded bg-gray-100 w-full"
        aria-live="polite"
      >
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
      />

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
