# Base image para build
FROM node:18-slim AS builder

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./           
COPY tsconfig.json ./           
COPY tsconfig.base.json ./     
COPY tailwind.config.js ./     
COPY postcss.config.cjs ./      
COPY vite.config.ts ./          
COPY index.html ./              

# Copia os diretórios de código
COPY src ./src                  
COPY public ./public            

# Instala dependências
RUN npm install

# Debug: Verifica as versões instaladas
RUN npm list --depth=0

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
COPY --from=builder /app/package*.json ./package.json

# Instala apenas dependências de produção
RUN npm install --production

# Expõe a porta padrão do servidor
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npx", "serve", "-s", "dist", "-l", "3000"]
