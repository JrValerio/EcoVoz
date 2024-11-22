# Use a imagem Node.js
FROM node:18-slim

# Defina o diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos necessários inicialmente
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do backend
COPY ./src ./src 
# Construa o backend
RUN npm run build

# Exponha a porta
EXPOSE 4000

# Comando de inicialização
CMD ["npm", "run", "build:backend"]
