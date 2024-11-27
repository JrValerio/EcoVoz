# Base image para build
FROM node:20-slim AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./         
RUN npm install

# Copia os demais arquivos e gera o build
COPY . .
RUN npm run build

# ----------------------------------------------
# Imagem final para servir o frontend
# ----------------------------------------------
FROM nginx:stable-alpine

# Remove configuração padrão do NGINX
RUN rm -rf /usr/share/nginx/html/*

# Copia o build do frontend para o NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Copia o arquivo customizado de configuração (opcional)
# COPY nginx.conf /etc/nginx/nginx.conf

# Expõe a porta 80
EXPOSE 80

# Comando padrão do NGINX
CMD ["nginx", "-g", "daemon off;"]
