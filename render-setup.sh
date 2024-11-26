#!/bin/bash

echo "==> Iniciando o setup no diretório: $(pwd)"

# Dependências essenciais de produção
npm install tailwindcss autoprefixer postcss redux react-redux react-router-dom core-js regenerator-runtime i18next @tailwindcss/forms @tailwindcss/typography -D

# Garantir que tudo no projeto esteja instalado
npm install

# Realizar o build do projeto
echo "==> Realizando o build do projeto..."
npm run build

echo "==> Setup concluído com sucesso!"
