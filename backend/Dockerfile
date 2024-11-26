# Etapa 1: Build
FROM node:18-slim AS builder

# Diretório de trabalho para a etapa de build
WORKDIR /app

# Copiar apenas os arquivos necessários para instalar as dependências
COPY package*.json tsconfig.json tsconfig.base.json ./

# Instalar dependências
RUN npm install

# Copiar o restante dos arquivos do backend
COPY ./src ./src

# Gerar o build de produção
RUN npm run build

# Etapa 2: Imagem final para produção
FROM node:18-slim

# Configuração do diretório de trabalho
WORKDIR /app

# Copie os arquivos da build para a imagem final
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instale dependências de produção
RUN npm install --production

# Exponha a porta do servidor
EXPOSE 4000

# Comando para iniciar o servidor
CMD ["npm", "start", "dist/index.js"]

