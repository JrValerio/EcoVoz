import React from 'react';
import clsx from 'clsx';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'danger' | 'link';
  disabled?: boolean;
  className?: string;
  type?: 'submit' | 'button' | 'reset';
  ariaLabel?: string; // Adicionado para acessibilidade
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button', // Permitir especificar o tipo do botão
  ariaLabel,
}) => {
  const baseStyles =
    'px-4 py-2 rounded transition font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    link: 'text-blue-500 hover:text-blue-700 underline',
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) {
      e.preventDefault();
      return;
    }
    onClick?.();
  };

  return (
    <button
      type={type}
      onClick={handleClick}
      aria-label={ariaLabel || 'button'}
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};

export default Button;
