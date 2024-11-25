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

# Diretório de trabalho para a imagem final
WORKDIR /app

# Copiar os arquivos gerados pelo build
COPY --from=builder /app/dist ./dist

# Copiar o arquivo de configuração package.json
COPY --from=builder /app/package*.json ./

# Instalar apenas dependências de produção
RUN npm install --production

# Expor a porta utilizada pelo backend
EXPOSE 4000

# Comando para iniciar o backend
CMD ["node", "dist/index.js"]
