#!/bin/bash

echo "==> Iniciando o setup no diretório: $(pwd)"

# Lista de dependências essenciais
DEPENDENCIES=(
  "tailwindcss"
  "autoprefixer"
  "postcss"
  "@tailwindcss/forms"
  "@tailwindcss/typography"
  "redux"
  "react-redux"
  "react-router-dom"
  "core-js"
  "regenerator-runtime"
  "i18next"
  "i18next-http-backend"
  "i18next-browser-languagedetector"
  "@emotion/react"
  "@emotion/styled"
  "@chakra-ui/react"
  "framer-motion"
  "react-icons"
  "react-speech-recognition"
  "react-toastify"
  "styled-components"
)

DEV_DEPENDENCIES=(
  "@babel/preset-react"
  "@eslint/js"
  "@testing-library/jest-dom"
  "@testing-library/react"
  "@testing-library/user-event"
  "@types/jest"
  "@types/node"
  "@types/react"
  "@types/react-dom"
  "@types/react-i18next"
  "@types/react-icons"
  "@vitejs/plugin-react"
  "@vitest/ui"
  "eslint"
  "eslint-plugin-react-hooks"
  "eslint-plugin-react-refresh"
  "globals"
  "identity-obj-proxy"
  "jsdom"
  "prettier"
  "vite-plugin-imagemin"
  "vitest"
  "typescript"
)

# Instalar dependências de produção
echo "==> Instalando dependências de produção..."
for DEP in "${DEPENDENCIES[@]}"; do
  npm install "$DEP"
done

# Instalar dependências de desenvolvimento
echo "==> Instalando dependências de desenvolvimento..."
for DEV_DEP in "${DEV_DEPENDENCIES[@]}"; do
  npm install --save-dev "$DEV_DEP"
done

# Garantir que todas as dependências do projeto estejam instaladas
echo "==> Instalando dependências gerais do projeto..."
npm install

# Realizar o build
echo "==> Realizando o build do projeto..."
npm run build

echo "==> Setup concluído com sucesso!"
