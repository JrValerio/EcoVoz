/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',               // HTML principal no frontend
    './src/**/*.{js,ts,jsx,tsx}', // Todos os arquivos React dentro da pasta src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
