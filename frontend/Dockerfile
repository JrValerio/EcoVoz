# Base image para build
FROM node:18-slim AS builder

# Diretório de trabalho
WORKDIR /app

# Copia todos os arquivos necessários para instalar dependências e realizar o build
COPY ./frontend/package*.json ./frontend/tailwind.config.js ./frontend/postcss.config.cjs ./frontend/tsconfig.json ./frontend/vite.config.ts ./frontend/src ./frontend/public ./

# Instala dependências
RUN npm install

# Gera o build de produção com o Tailwind configurado no Vite
RUN npm run build

# ----------------------------------------------
# Imagem final para servir o frontend
# ----------------------------------------------
FROM node:18-slim

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./package.json

# Instala apenas dependências de produção
RUN npm install --production

# Expõe a porta padrão do servidor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
