import React from 'react';

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="bg-red-100 text-red-800 p-4 mb-4 rounded shadow">
      {message}
    </div>
  );
};

export default ErrorMessage;
