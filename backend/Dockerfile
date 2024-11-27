# Base image para build
FROM node:20-slim AS builder

# Definir o diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos essenciais para instalação de dependências
COPY package*.json ./
RUN npm install

# Copiar os arquivos restantes do backend
COPY . .

# Gerar o build
RUN npm run build

# ----------------------------------------------
# Imagem final para produção
# ----------------------------------------------
FROM node:20-slim

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos necessários do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalar dependências de produção
RUN npm install --production

# Expor a porta do servidor
EXPOSE 4000

# Comando para iniciar o servidor
CMD ["node", "dist/index.js"]
