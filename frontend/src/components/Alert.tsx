import React, { useState } from 'react';

// Interface para definir as propriedades do componente Alert
interface AlertProps {
  /** Tipo do alerta (success, error, warning ou info). */
  type: 'success' | 'error' | 'warning' | 'info';
  /** Mensagem a ser exibida no alerta. */
  message: string;
  /** Indica se o alerta pode ser fechado pelo usuário. */
  dismissible?: boolean;
  /** Função a ser executada quando o alerta é fechado. */
  onDismiss?: () => void;
}

/**
 * Componente de alerta reutilizável com diferentes tipos e estilos.
 * 
 * @param type Tipo do alerta (success, error, warning ou info).
 * @param message Mensagem a ser exibida no alerta.
 * @param dismissible Indica se o alerta pode ser fechado pelo usuário (padrão: false).
 * @param onDismiss Função a ser executada quando o alerta é fechado.
 * @returns O componente Alert renderizado.
 */
const Alert: React.FC<AlertProps> = ({ type, message, dismissible = false, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Se o alerta não estiver visível, não renderiza nada
  if (!isVisible) return null;

  // Define a cor de fundo do alerta de acordo com o tipo
  const bgColor =
    type === 'success'
      ? 'bg-green-100 text-green-800 border-green-300'
      : type === 'error'
      ? 'bg-red-100 text-red-800 border-red-300'
      : type === 'warning'
      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
      : 'bg-blue-100 text-blue-800 border-blue-300';

  /**
   * Fecha o alerta e chama a função onDismiss, se fornecida.
   */
  const handleDismiss = () => {
    setIsVisible(false);
    onDismiss?.();
  };

  return (
    <div
      className={`${bgColor} p-4 mb-4 rounded border shadow animate-fade`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex justify-between items-center">
        <span>{message}</span> {/* Exibe a mensagem do alerta */}
        {dismissible && ( // Renderiza o botão de fechar se dismissible for true
          <button onClick={handleDismiss} aria-label="Fechar alerta" className="ml-4 text-gray-500 hover:text-gray-700">
            ✖
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;