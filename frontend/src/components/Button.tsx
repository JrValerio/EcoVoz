import React from 'react';
import clsx from 'clsx';

// Interface para definir as propriedades do componente Button
interface ButtonProps {
  /** Conteúdo do botão. */
  children: React.ReactNode;
  /** Função a ser executada quando o botão é clicado. */
  onClick?: () => void;
  /** Variante de estilo do botão. */
  variant?: 'primary' | 'secondary' | 'danger' | 'link';
  /** Indica se o botão está desabilitado. */
  disabled?: boolean;
  /** Classes CSS adicionais. */
  className?: string;
  /** Tipo do botão (submit, button ou reset). */
  type?: 'submit' | 'button' | 'reset';
  /** Rótulo ARIA para acessibilidade. */
  ariaLabel?: string;
}

/**
 * Componente de botão reutilizável com diferentes variantes de estilo.
 *
 * @param children O conteúdo do botão.
 * @param onClick Função a ser executada quando o botão é clicado.
 * @param variant Variante de estilo do botão (padrão: 'primary').
 * @param disabled Indica se o botão está desabilitado (padrão: false).
 * @param className Classes CSS adicionais.
 * @param type Tipo do botão (padrão: 'button').
 * @param ariaLabel Rótulo ARIA para acessibilidade.
 * @returns O componente Button renderizado.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  type = 'button',
  ariaLabel,
}) => {
  // Estilos base do botão
  const baseStyles =
    'px-4 py-2 rounded transition font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

  // Variantes de estilo
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300',
    secondary: 'bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300',
    link: 'text-blue-500 hover:text-blue-700 underline',
  };

  /**
   * Manipula o clique do botão.
   * @param e Evento de clique.
   */
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
      aria-label={ariaLabel || 'button'} // Define o rótulo ARIA
      disabled={disabled}
      className={clsx(
        baseStyles,
        variants[variant],
        disabled && 'opacity-50 cursor-not-allowed',
        className,
      )}
    >
      {children}
    </button>
  );
};

export default Button;
