# Etapa 1: Build do Frontend
FROM node:20-slim AS builder

# Diretório de trabalho dentro do contêiner
WORKDIR /app

# Copiar apenas arquivos de dependências inicialmente (para cache otimizado)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar o restante do código-fonte para o contêiner
COPY . .

# Gera o build de produção
RUN npm run build

# ----------------------------------------------
# Etapa 2: Servir os Arquivos Estáticos
# ----------------------------------------------
FROM nginx:stable-alpine

# Remove arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos do build para o diretório padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar o arquivo customizado de configuração do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta padrão do Nginx
EXPOSE 80

# Comando para iniciar o servidor Nginx
CMD ["nginx", "-g", "daemon off;"]
