import { useState, useEffect } from 'react';
import SpeechRecognition, {
  useSpeechRecognition as useSpeechRecognitionLib,
} from 'react-speech-recognition';
import { useTranslation } from 'react-i18next';

const useSpeechRecognition = () => {
  const { t } = useTranslation();
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognitionLib();

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      setError(t('voiceInput.browserNotSupported'));
    }
  }, [browserSupportsSpeechRecognition, t]);

  const startListening = (language = 'pt-BR') => {
    setError(null); // Limpa erros anteriores
    try {
      SpeechRecognition.startListening({ continuous: true, language });
    } catch (err) {
      console.error(err); 
      setError(t('voiceInput.startError'));
    }
  };

  const stopListening = () => {
    try {
      SpeechRecognition.stopListening();
    } catch (err) {
      console.error(err); 
      setError(t('voiceInput.startError'));
    }
  };

  const clearTranscript = () => {
    resetTranscript();
  };

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
