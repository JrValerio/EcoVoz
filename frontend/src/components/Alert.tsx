import React from 'react';

type AlertProps = {
  type: 'success' | 'error';
  message: string;
};

const Alert: React.FC<AlertProps> = ({ type, message }) => {
  const bgColor = type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';

  return (
    <div className={`${bgColor} p-4 mb-4 rounded shadow`}>
      {message}
    </div>
  );
};

export default Alert;
