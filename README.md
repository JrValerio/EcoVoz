# **EcoVoz**

![Logo do EcoVoz](https://github.com/JrValerio/EcoVoz/blob/6d2d3e35459c877d1de0e0a6b7436505d03e0e02/frontend/src/assets/images/Logo.jpg)

**EcoVoz** é uma aplicação inclusiva desenvolvida para facilitar a comunicação e acessibilidade de pessoas com deficiências de fala, linguagem, auditiva ou motora. Utilizando tecnologias avançadas, o projeto integra recursos como reconhecimento de fala, gestos e texto para oferecer soluções práticas e inovadoras.

---

## **Índice**
1. [Visão Geral](#visão-geral)
2. [Agradecimentos](#Agradecimentos)
3. [Funcionalidades](#funcionalidades)
4. [Demonstração Visual](#demonstração-visual)
5. [Estrutura do Projeto](#estrutura-do-projeto)
6. [Tecnologias Utilizadas](#tecnologias-utilizadas)
7. [Configuração e Execução](#configuração-e-execução)
8. [Roadmap](#roadmap)
9. [Contribuindo](#contribuindo)
10. [Licença](#licença)
11. [Contato](#contato)

---

## **Visão Geral**
O **EcoVoz** foi criado durante o **Hackathon Autismo Tech 2024**, como parte do esforço da **Equipe 12** composta por Adriana Felix Lira, Amaro V S Junior, Daniel Moura, Keisy Stella, Leticia Fernandes e Natalia. 

A aplicação é um reflexo do espírito colaborativo e inovador deste hackathon. Gostaríamos de expressar nossa gratidão à equipe organizadora, especialmente ao **Caio Bogos** ([LinkedIn](https://www.linkedin.com/in/caiobogos/)), por proporcionar uma experiência inesquecível e inspiradora.

---
## **Agradecimentos**

Este projeto foi desenvolvido durante o **Hackathon Autismo Tech 2024**, organizado com excelência pela equipe do evento. Agradecemos especialmente ao **Caio Bogos** ([LinkedIn](https://www.linkedin.com/in/caiobogos/)) e a todos os envolvidos por promover um espaço de inclusão, inovação e aprendizado.

Um agradecimento especial à **Equipe 12**, formada por:
- Adriana Felix Lira  
- Amaro V S Junior  
- Daniel Moura  
- Keisy Stella  
- Leticia Fernandes  
- Natalia  

Obrigado por tornarem este projeto possível!

---

## **Funcionalidades**
- **Tradução de Áudio para Texto:** Integração com Google Speech-to-Text ou Whisper para transcrever fala.
- **Reconhecimento de Gestos:** Processamento de vídeos com IA usando TensorFlow e OpenCV.
- **Interface de Comunicação Assistida:** Mensagens criadas por voz ou texto.
- **Design Inclusivo:** Aplicação responsiva e acessível, pensada para todos os dispositivos.
- **Autenticação com Google OAuth:** Para uma experiência de login segura e prática.
- **Gerenciamento de Dados:** Backend robusto com MongoDB para armazenamento.

---

## **Demonstração Visual**

### **Página Inicial**
![Página Inicial](https://github.com/JrValerio/EcoVoz/blob/main/frontend/src/assets/images/Home.png)

### **Exemplo de Uso do Speech-to-Text**
![Exemplo de Uso do Speech-to-Text](https://github.com/JrValerio/EcoVoz/blob/main/frontend/src/assets/images/Home%20Speak.png)

### **Sobre**
![Página Sobre](https://github.com/JrValerio/EcoVoz/blob/053662fda91445ae12ed7b90c5273c49b64446b9/frontend/src/assets/images/About.png)

### **Login**
![Tela de Login](https://github.com/JrValerio/EcoVoz/blob/main/frontend/src/assets/images/Login.png)

### **Cadastro**
![Tela de Cadastro](https://github.com/JrValerio/EcoVoz/blob/main/frontend/src/assets/images/Register.png)

### **Ajuda**
![Página de Ajuda](https://github.com/JrValerio/EcoVoz/blob/main/frontend/src/assets/images/Help.png)

### **Links Úteis**
![Página de Links](https://github.com/JrValerio/EcoVoz/blob/main/frontend/src/assets/images/LinksPage.png)

### **Reconhecimento de Gestos**
![Reconhecimento de Gestos](https://github.com/JrValerio/EcoVoz/blob/main/frontend/src/assets/images/GestureRecognition.png)

### **Resultado do Reconhecimento de Gestos**
![Resultado do Reconhecimento de Gestos](https://github.com/JrValerio/EcoVoz/blob/main/frontend/src/assets/images/GestureRecognition_UP.png)

---

## **Estrutura do Projeto**
```
EcoVoz/
├── backend-node/           # Backend principal em Node.js
├── backend-python/         # Backend para processamento avançado em Python
├── frontend/               # Aplicação frontend em React
├── .gitignore              # Arquivo para ignorar arquivos no Git
├── docker-compose.yml      # Orquestração do Docker para o projeto completo
└── README.md               # Documentação do projeto
```

---

## **Tecnologias Utilizadas**

### **Frontend**
- React.js
- Tailwind CSS
- Axios
- WebSocket

### **Backend Node.js**
- Express.js
- Mongoose (ODM para MongoDB)
- WebSocket
- Multer (upload de arquivos)

### **Backend Python**
- **FastAPI** e **Flask**: Para criar APIs REST e serviços backend.
- **MediaPipe**: Para rastreamento de mãos e reconhecimento de gestos.
- **PyTorch e TorchVision**: Para treinamento e execução de modelos de aprendizado profundo que interpretam os dados de gestos detectados.
- **OpenCV**: Para processamento de vídeo e imagens em tempo real.

### **Banco de Dados**
- MongoDB: Gerenciamento de dados do usuário, sessões e configurações.

---

## **Configuração e Execução**

### **Pré-requisitos**
- **Node.js:** v18+
- **Python:** v3.10+
- **Docker:** v20.10+
- **Docker Compose:** v2.0+
- **MongoDB:** v6.0+ (local ou em um serviço como MongoDB Atlas)

### **Passo a Passo**
1. **Clone o repositório:**
   ```bash
   git clone https://github.com/JrValerio/EcoVoz.git
   cd EcoVoz https://ecovoz-d2hi.onrender.com
   ```

2. **Configure o arquivo `.env`:**
   Crie um arquivo `.env` na raiz do projeto com as variáveis de ambiente necessárias:
   ```env
   MONGO_URI=mongodb://localhost:27017/ecovoz
   REACT_APP_API_URL=http://localhost:5000
   ```

3. **Suba o ambiente com Docker Compose:**
   Certifique-se de que o Docker está instalado e execute:
   ```bash
   docker-compose up --build
   ```

4. **Acesse a aplicação:**
   - **Frontend:** `http://localhost:3000`
   - **Backend Node.js:** `http://localhost:5000`

---

## **Roadmap**
- [ ] Autenticação com Google OAuth
- [ ] Reconhecimento de gestos com backend Python
- [ ] Integração com Libras (Língua Brasileira de Sinais)
- [ ] Melhorias na interface do usuário
- [ ] Suporte para múltiplos idiomas
- [ ] Implementação de notificações em tempo real

---

## **Contribuindo**
1. **Faça um fork do projeto:**
   ```bash
   git fork https://github.com/JrValerio/EcoVoz.git
   ```
2. **Crie uma nova branch:**
   ```bash
   git checkout -b minha-feature
   ```
3. **Commit suas alterações:**
   ```bash
   git commit -m "Descrição da minha feature"
   ```
4. **Envie a branch:**
   ```bash
   git push origin minha-feature
   ```
5. **Abra um Pull Request.**

---

## **Licença**
Este projeto está licenciado sob a **MIT License**. Para mais detalhes, veja o arquivo [LICENSE](./LICENSE).

---

## **Contato**
Criado por **Amaro Júnior**.  
📧 E-mail: [amarovsjr81r@email.com](mailto:amarovsjr81r@email.com)  
🔗 LinkedIn: [Amaro Júnior](https://www.linkedin.com/in/jrvalerio/)  

