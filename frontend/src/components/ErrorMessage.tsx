import React from 'react';

interface ErrorMessageProps {
  /** Mensagem de erro a ser exibida. */
  message: string;
}

/**
 * Componente que exibe uma mensagem de erro.
 * 
 * @param message A mensagem de erro a ser exibida.
 * @returns Um elemento div com a mensagem de erro estilizada.
 */
const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-800 p-4 mb-4 rounded shadow">
      {message}
    </div>
  );
};

export default ErrorMessage;