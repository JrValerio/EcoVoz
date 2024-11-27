# Base leve baseada no Debian
FROM python:3.12-bookworm

RUN apt-get update && apt-get install -y \
    build-essential \
    libffi-dev \
    libssl-dev \
    gcc-12 \
    libjpeg-dev \
    zlib1g-dev \
    bash \
    git \
    cmake \
    g++ \
    linux-headers-amd64 \
    ffmpeg \
    libopencv-dev \
    python3-numpy \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*




# Atualizar o pip
RUN pip install --no-cache-dir --upgrade pip

# Definir o diretório de trabalho
WORKDIR /app

# Copiar os arquivos de dependências
COPY requirements*.txt ./

# Instalar dependências mínimas
RUN pip install --no-cache-dir -r requirements-minimal.txt

# Instalar dependências completas
RUN pip install --no-cache-dir -r requirements-full.txt

# Copiar o código-fonte para o contêiner
COPY . .

# Expor a porta do backend-python
EXPOSE 5000

# Comando para rodar o servidor
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "5000"]
