declare module 'react-speech-recognition' {
  interface SpeechRecognitionOptions {
    /** Se true, o reconhecimento de voz continuará após uma pausa. */
    continuous?: boolean;
    /** Se true, resultados intermediários serão retornados. */
    interimResults?: boolean;
    /** O código de idioma para o reconhecimento de voz (ex: 'pt-BR', 'en-US'). */
    lang?: string;
  }

  export interface SpeechRecognitionResult {
    /** A transcrição da fala reconhecida. */
    transcript: string;
    /** A confiança na transcrição (entre 0 e 1). */
    confidence: number;
  }

  /**
   * Hook que fornece funções e informações sobre o reconhecimento de voz.
   * @param options Opções para configurar o reconhecimento de voz.
   * @returns Um objeto com informações e funções para controlar o reconhecimento de voz.
   */
  export function useSpeechRecognition(
    options?: SpeechRecognitionOptions
  ): {
    /** A transcrição da fala reconhecida. */
    transcript: string;
    /** Indica se o reconhecimento de voz está ativo. */
    listening: boolean;
    /** Função para resetar a transcrição. */
    resetTranscript: () => void;
    /** Indica se o navegador suporta reconhecimento de voz. */
    browserSupportsSpeechRecognition: boolean;
    /** Função para iniciar o reconhecimento de voz. */
    startListening: (options?: SpeechRecognitionOptions) => Promise<void>;
    /** Função para parar o reconhecimento de voz. */
    stopListening: () => Promise<void>;
  };

  /**
   * Inicia o reconhecimento de voz.
   * @param options Opções para configurar o reconhecimento de voz.
   */
  export function startListening(options: SpeechRecognitionOptions): void;

  /**
   * Para o reconhecimento de voz.
   */
  export function stopListening(): void;
}