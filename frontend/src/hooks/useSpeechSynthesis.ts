// src/hooks/useSpeechSynthesis.ts
import { useRef, useState, useEffect } from 'react';

const useSpeechSynthesis = () => {
  const synth = useRef(window.speechSynthesis);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    const populateVoices = () => {
      setVoices(synth.current.getVoices());
    };

    if (synth.current.onvoiceschanged !== undefined) {
      synth.current.onvoiceschanged = populateVoices;
    }

    populateVoices();
  }, []);

  const speak = (text: string, lang: string = 'pt-BR') => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;

    const selectedVoice = voices.find((voice) => voice.lang === lang);
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    } else {
      console.warn(`Voz para o idioma ${lang} não encontrada.`);
    }

    synth.current.speak(utterance);
  };

  return { speak, voices, stop: synth.current.cancel };
};

export default useSpeechSynthesis;