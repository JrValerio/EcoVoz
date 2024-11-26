#!/bin/bash

echo "==> Iniciando o setup no diretório: $(pwd)"

# Instalar dependências essenciais
echo "==> Instalando dependências essenciais e plugins..."
npm install --save-dev \
  tailwindcss \
  autoprefixer \
  postcss \
  @tailwindcss/forms \
  @tailwindcss/typography

# Instalar dependências do projeto, incluindo o i18next-http-backend
npm install \
  redux \
  react-redux \
  react-router-dom \
  core-js \
  regenerator-runtime \
  i18next \
  i18next-http-backend

# Instalar dependências gerais do projeto
echo "==> Instalando dependências gerais do projeto..."
npm install

# Realizar o build
echo "==> Realizando o build do projeto..."
npm run build

echo "==> Setup concluído com sucesso!"
