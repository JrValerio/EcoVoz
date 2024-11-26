#!/bin/bash

echo "Iniciando o setup no diretório: $(pwd)"

# Instalar dependências específicas (incluindo dependências relacionadas a i18n e TailwindCSS)
npm install \
  tailwindcss \
  autoprefixer \
  postcss \
  @tailwindcss/forms \
  @tailwindcss/typography \
  redux \
  react-redux \
  react-router-dom \
  core-js \
  regenerator-runtime \
  i18next \
  i18next-http-backend \
  i18next-browser-languagedetector \
  react-i18next -D

# Reinstalação de dependências gerais
npm install

# Confirmação da versão do Node.js
echo "Versão do Node.js em uso:"
node -v

# Realização do build do projeto
echo "Executando o build do projeto..."
npm run build

echo "Setup concluído com sucesso!"
