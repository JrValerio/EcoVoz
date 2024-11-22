declare module 'react-speech-recognition' {
    interface SpeechRecognitionOptions {
      continuous?: boolean;
      interimResults?: boolean;
      lang?: string;
    }
  
    export interface SpeechRecognitionResult {
      transcript: string;
      confidence: number;
    }
  
    export function useSpeechRecognition(
      options?: SpeechRecognitionOptions
    ): {
      transcript: string;
      listening: boolean;
      resetTranscript: () => void;
      browserSupportsSpeechRecognition: boolean;
      startListening: (options?: SpeechRecognitionOptions) => Promise<void>; // Adiciona tipos para métodos
      stopListening: () => Promise<void>;
    };

    export function startListening(_arg0: { continuous: boolean; language: string; }) {
        throw new Error('Function not implemented.');
    }

    export function stopListening() {
        throw new Error('Function not implemented.');
    }
  }
  