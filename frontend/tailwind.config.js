/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // Ativa o suporte ao tema escuro baseado em classes
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundColor: {
        body: 'var(--bg-color)',
      },
      // Definições de animações personalizadas
      keyframes: {
        fade: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        fade: 'fade 0.3s ease-in-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'), // Otimiza estilos de formulários
    require('@tailwindcss/typography'), // Adiciona suporte a tipografia avançada
  ],
};
