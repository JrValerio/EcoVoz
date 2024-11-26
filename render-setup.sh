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

# Instalar dependências do projeto
echo "==> Instalando dependências do projeto..."
npm install

# Exibir versão do Node.js e npm
echo "==> Versão do Node.js:"
node -v
echo "==> Versão do npm:"
npm -v

# Realizar o build
echo "==> Realizando o build do projeto..."
npm run build

echo "==> Setup concluído com sucesso!"
