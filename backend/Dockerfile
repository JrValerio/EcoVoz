# Base para build
FROM node:20-slim AS builder

# Instalar Python e ferramentas de build
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 python3-pip python3-dev \
    build-essential \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Configuração do diretório de trabalho
WORKDIR /app

# Copiar apenas arquivos de dependências
COPY package*.json ./

# Instalar dependências de produção
RUN npm install --production

# Copiar o restante do código-fonte
COPY . .

# Construir o código
RUN npm run build

# ----------------------------------------------
# Imagem final para produção
# ----------------------------------------------
FROM node:20-slim

# Instalar dependências necessárias para produção
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3 \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copiar arquivos do estágio de build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instalar dependências de produção
RUN npm install --production

# Expor porta
EXPOSE 4000

# Comando padrão
CMD ["node", "dist/index.js"]
