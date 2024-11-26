#!/bin/bash

echo "==> Iniciando o setup no diretório: $(pwd)"

# Dependências essenciais de produção
npm install react react-dom react-router-dom redux react-redux @vitejs/plugin-react vite -D

# Dependências de desenvolvimento e build
npm install @tailwindcss/forms @tailwindcss/typography postcss autoprefixer -D

# Garantir que tudo no projeto esteja instalado
npm install

# Realizar o build do projeto
echo "==> Realizando o build do projeto..."
npm run build

echo "==> Setup concluído com sucesso!"
