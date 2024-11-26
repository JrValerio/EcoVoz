#!/bin/bash

echo "==> Iniciando o setup no diretório: $(pwd)"

# Dependências essenciais de produção
echo "==> Instalando dependências de produção..."
npm install tailwindcss autoprefixer postcss redux react-redux react-router-dom core-js regenerator-runtime i18next @tailwindcss/forms @tailwindcss/typography @emotion/react @emotion/styled @chakra-ui/react framer-motion react-icons react-speech-recognition react-toastify styled-components -D
if [ $? -ne 0 ]; then
    echo "Erro ao instalar dependências de produção."
    exit 1
fi

# Dependências de desenvolvimento
echo "==> Instalando dependências de desenvolvimento..."
npm install @babel/preset-react @eslint/js @testing-library/jest-dom @testing-library/react @testing-library/user-event @types/jest @types/node @types/react @types/react-dom @types/react-i18next @types/react-icons @vitejs/plugin-react @vitest/ui eslint eslint-plugin-react-hooks eslint-plugin-react-refresh globals identity-obj-proxy jsdom prettier vite-plugin-imagemin vitest typescript -D
if [ $? -ne 0 ]; then
    echo "Erro ao instalar dependências de desenvolvimento."
    exit 1
fi

# Garantir que tudo no projeto esteja instalado
echo "==> Instalando dependências gerais..."
npm install
if [ $? -ne 0 ]; then
    echo "Erro ao instalar dependências gerais."
    exit 1
fi

# Realizar o build do projeto
echo "==> Realizando o build do projeto..."
npm run build
if [ $? -ne 0 ]; then
    echo "Erro ao realizar o build do projeto."
    exit 1
fi

echo "==> Setup concluído com sucesso!"
