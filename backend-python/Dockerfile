# Base leve com Python
FROM python:3.12-slim AS base

# Atualizações e pacotes essenciais
RUN apt-get update && apt-get install -y \
    build-essential \
    libopencv-dev \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Define o diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY requirements-minimal.txt requirements-full.txt ./

# Instalar dependências mínimas (essenciais para rodar o backend básico)
RUN pip install --no-cache-dir -r requirements-minimal.txt

# -----------------------------------------------
# Estágio completo para ambientes com dependências pesadas
# -----------------------------------------------
FROM base AS full

# Instalar dependências completas (visão computacional e ML)
RUN pip install --no-cache-dir -r requirements-full.txt

# Copiar o restante do código para o contêiner
COPY . .

# -----------------------------------------------
# Ambiente final para produção
# -----------------------------------------------
FROM full AS production

# Expor a porta do backend-python
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"]
