import React, { useState } from 'react';

type AlertProps = {
  type: 'success' | 'error' | 'warning' | 'info'; // Adicionado warning e info
  message: string;
  dismissible?: boolean; // Define se o alerta pode ser fechado
  onDismiss?: () => void; // Callback para fechamento
};

const Alert: React.FC<AlertProps> = ({ type, message, dismissible = false, onDismiss }) => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const bgColor =
    type === 'success'
      ? 'bg-green-100 text-green-800 border-green-300'
      : type === 'error'
      ? 'bg-red-100 text-red-800 border-red-300'
      : type === 'warning'
      ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
      : 'bg-blue-100 text-blue-800 border-blue-300';

  const handleDismiss = () => {
    setIsVisible(false);
    if (onDismiss) onDismiss();
  };

  return (
    <div
      className={`${bgColor} p-4 mb-4 rounded border shadow animate-fade`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="flex justify-between items-center">
        <span>{message}</span>
        {dismissible && (
          <button
            onClick={handleDismiss}
            aria-label="Fechar alerta"
            className="ml-4 text-gray-500 hover:text-gray-700"
          >
            ✖
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
