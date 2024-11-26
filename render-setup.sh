#!/bin/bash

echo "==> Iniciando o setup no diretório: $(pwd)"

# Instalar dependências essenciais e plugins necessários
echo "==> Instalando dependências..."
npm install --save-dev \
  tailwindcss \
  autoprefixer \
  postcss \
  redux \
  react-redux \
  react-router-dom \
  core-js \
  regenerator-runtime \
  i18next \
  i18next-http-backend \
  i18next-browser-languagedetector \
  react-i18next \
  @tailwindcss/forms \
  @tailwindcss/typography

# Instalar todas as dependências
npm install

# Exibir versão do Node.js e NPM
echo "==> Versão do Node.js:"
node -v
echo "==> Versão do npm:"
npm -v

# Realizar o build
echo "==> Realizando o build do projeto..."
npm run build

echo "==> Setup concluído com sucesso!"
