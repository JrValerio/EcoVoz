import { useState, useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition as useSpeechRecognitionLib,
} from 'react-speech-recognition';
import { useTranslation } from 'react-i18next';

/**
 * Hook customizado para usar o reconhecimento de voz.
 * 
 * @returns Um objeto com as seguintes propriedades:
 * - `transcript`: A transcrição do que foi dito.
 * - `listening`: Indica se o reconhecimento de voz está ativo.
 * - `error`: Mensagem de erro, se houver.
 * - `startListening`: Função para iniciar o reconhecimento de voz.
 * - `stopListening`: Função para parar o reconhecimento de voz.
 * - `clearTranscript`: Função para limpar a transcrição.
 * - `browserSupportsSpeechRecognition`: Indica se o navegador suporta reconhecimento de voz.
 */
const useSpeechRecognition = () => {
  const { t } = useTranslation();

  // Utiliza o hook useSpeechRecognition da biblioteca react-speech-recognition
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognitionLib();

  const [error, setError] = useState<string | null>(null);

  // Verifica se o navegador suporta reconhecimento de voz
  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError(t('voiceInput.browserNotSupported'));
    }
  }, [browserSupportsSpeechRecognition, t]);

  /**
   * Inicia o reconhecimento de voz.
   * @param language Idioma do reconhecimento de voz (padrão: 'pt-BR').
   */
  const startListening = (language = 'pt-BR') => {
    setError(null);
    try {
      SpeechRecognition.startListening({ continuous: true, language });
    } catch (err) {
      console.error('[ERROR] Erro ao iniciar o reconhecimento de voz:', err);
      setError(t('voiceInput.startError'));
    }
  };

  /**
   * Para o reconhecimento de voz.
   */
  const stopListening = () => {
    try {
      SpeechRecognition.stopListening();
    } catch (err) {
      console.error('[ERROR] Erro ao parar o reconhecimento de voz:', err);
      setError(t('voiceInput.stopError'));
    }
  };

  /**
   * Limpa a transcrição.
   */
  const clearTranscript = () => {
    resetTranscript();
  };

  // Retorna as funções e variáveis do hook
  return {
    transcript,
    listening,
    error,
    startListening,
    stopListening,
    clearTranscript,
    browserSupportsSpeechRecognition,
  };
};

export default useSpeechRecognition;