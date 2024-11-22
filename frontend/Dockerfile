# Base image para build
FROM node:18-slim AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos necessários para instalar dependências e realizar o build
COPY ./frontend/package*.json ./frontend/tailwind.config.js ./frontend/postcss.config.cjs ./frontend/tsconfig.json ./frontend/vite.config.ts ./
COPY ./frontend/src/input.css ./src/input.css

# Instala dependências
RUN npm install

# Gera o arquivo CSS otimizado do Tailwind
RUN npx tailwindcss -i ./src/input.css -o ./dist/output.css --minify

# Copia o restante dos arquivos do projeto, incluindo os assets
COPY ./frontend ./ 

# Gera o build de produção
RUN npm run build

# ----------------------------------------------
# Imagem final para servir o frontend
# ----------------------------------------------
FROM node:18-slim

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instala apenas dependências de produção
RUN npm install --production

# Expõe a porta padrão do servidor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
