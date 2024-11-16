# Base image
FROM node:18 AS builder

# Diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários para instalar dependências
COPY ./frontend/package*.json ./

# Instala dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY ./frontend ./

# Gera o build de produção
RUN npm run build

# ----------------------------------------------
# Imagem final para servir o frontend
# ----------------------------------------------
FROM node:18-slim

# Diretório de trabalho
WORKDIR /app

# Copia apenas os arquivos necessários do estágio anterior
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instala apenas dependências de produção
RUN npm install --production

# Expõe a porta padrão do servidor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "preview"]
