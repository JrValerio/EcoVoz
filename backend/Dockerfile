# Usar a imagem do Node.js
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar apenas os arquivos de configuração necessários
COPY ./backend/package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código
COPY ./backend ./

# Expor a porta usada pela aplicação
EXPOSE 4000

# Comando para rodar o backend em desenvolvimento
CMD ["npm", "run", "dev"]
