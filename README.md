Segue o README atualizado com a **Tabela de Conteúdos** adicionada:

````markdown
# EcoVoz Project

## Table of Contents

- [Sobre o Projeto](#sobre-o-projeto)
- [O que o Projeto Já Possui](#o-que-o-projeto-já-possui)
- [Como Clonar o Repositório e Iniciar o Projeto](#como-clonar-o-repositório-e-iniciar-o-projeto)
  - [1. Clonando o Repositório](#1-clonando-o-repositório)
  - [2. Instalação das Dependências](#2-instalação-das-dependências)
  - [3. Executando o Projeto](#3-executando-o-projeto)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Regras de Commits](#regras-de-commits)
- [Fluxo de Trabalho para Contribuir](#fluxo-de-trabalho-para-contribuir)
- [Roadmap](#roadmap)

## Sobre o Projeto

**EcoVoz** é uma aplicação desenvolvida para auxiliar na acessibilidade e comunicação de pessoas com deficiência. O projeto faz parte do Hackathon Autismo Tech 2024 e visa criar uma solução inclusiva e eficiente.

## O que o Projeto Já Possui

Até o momento, o projeto EcoVoz inclui:

1. **Configuração do Frontend**:

   - Estrutura inicial do React com TypeScript.
   - Configuração do Vite como ferramenta de build.
   - Integração com Redux para gerenciamento de estado global.
   - Configuração inicial para suporte a responsividade e acessibilidade.

2. **Configuração do Backend**:

   - Estrutura básica para o servidor utilizando Node.js com Express.
   - Configuração inicial do TypeScript para maior segurança no desenvolvimento.
   - Conexão com MongoDB para armazenamento de dados.
   - Rotas de autenticação com suporte a JWT (JSON Web Tokens).
   - Configuração de middlewares de segurança e validação.

3. **Ferramentas de Linting e Formatação**:

   - **ESLint** para manter a qualidade do código.
   - **Prettier** para formatação consistente.
   - **Husky** e **lint-staged** para verificação automática antes dos commits.

4. **Estrutura Inicial de Componentes e Estado**:

   - Exemplo de componente `Header` com integração de login e logout usando Redux.
   - Configuração básica para adicionar mais componentes e lógica de estado.

5. **Automação e Configuração de Ambientes**:
   - Suporte a Docker e Docker Compose para unificar o ambiente de desenvolvimento.
   - Configuração inicial para pipelines de CI/CD usando GitHub Actions.

## Como Clonar o Repositório e Iniciar o Projeto

### 1. Clonando o Repositório

Primeiro, faça o clone do repositório para sua máquina local:

```bash
git clone https://github.com/JrValerio/EcoVoz.git
cd EcoVoz
```
````

### 2. Instalação das Dependências

Após clonar o repositório, você precisa instalar as dependências para o frontend e o backend separadamente.

- **Instalando Dependências do Frontend**:

  ```bash
  cd frontend
  npm install
  ```

- **Instalando Dependências do Backend**:

  ```bash
  cd ../backend
  npm install
  ```

### 3. Executando o Projeto

Para rodar o projeto localmente, siga as instruções abaixo:

- **Iniciar o Frontend**:

  ```bash
  cd frontend
  npm run dev
  ```

- **Iniciar o Backend**:

  ```bash
  cd ../backend
  npm run dev
  ```

- **Usando Docker Compose** (opcional):

  ```bash
  docker-compose up --build
  ```

## Estrutura do Projeto

- `frontend/`: Contém o código do frontend (React).
- `backend/`: Contém o código do backend (Express).
- `shared/`: Código compartilhado entre frontend e backend (ex.: tipos, constantes, utilitários).
- `.husky/`: Configurações para hooks de commits.
- `.eslintrc.js`, `.prettierrc`, `.editorconfig`: Arquivos de configuração para formatação e linting.
- `docker-compose.yml`: Configuração para ambientes de desenvolvimento usando Docker.

## Regras de Commits

Para mantermos o histórico do projeto organizado e consistente, vamos utilizar **commits semânticos em inglês**. Seguindo essas diretrizes, todos no grupo poderão entender rapidamente o que cada commit altera ou adiciona ao projeto.

### Estrutura do Commit

Cada mensagem de commit deve seguir o seguinte formato:

```
<type>(<scope>): <description>
```

- **`<type>`**: Define o tipo de alteração feita.
- **`<scope>`**: Indica a área ou componente afetado (ex.: `frontend`, `backend`, `redux`, `styles`, `auth`).
- **`<description>`**: Uma breve descrição da mudança, em inglês, começando com letra minúscula.

### Tipos de Commit

Aqui estão os tipos de commit que iremos utilizar:

- **feat**: Adiciona uma nova funcionalidade ao projeto.
  - Exemplo: `feat(frontend): add login button`
- **fix**: Corrige um bug.
  - Exemplo: `fix(backend): correct API route for user login`
- **chore**: Mudanças de configuração, como instalação de pacotes ou setup de ferramentas.
  - Exemplo: `chore: install eslint and prettier`
- **docs**: Alterações na documentação (ex.: README, comentários).
  - Exemplo: `docs: update README with commit rules`
- **style**: Mudanças de formatação que não afetam o código (espaços, ponto e vírgula, etc.).
  - Exemplo: `style(frontend): apply consistent spacing in App.tsx`
- **refactor**: Refatoração de código, como melhoria de legibilidade ou desempenho, sem alterar a funcionalidade.
  - Exemplo: `refactor(redux): simplify user reducer logic`
- **test**: Adição ou modificação de testes.
  - Exemplo: `test(frontend): add tests for login component`
- **perf**: Alterações que melhoram o desempenho.
  - Exemplo: `perf(backend): optimize database queries`
- **build**: Alterações que afetam o sistema de build ou dependências externas.
  - Exemplo: `build: update npm scripts for deployment`

## Fluxo de Trabalho para Contribuir

1. **Clone o Repositório e Crie uma Nova Branch**:

   - Sempre que for adicionar uma nova funcionalidade ou corrigir um bug, crie uma nova branch a partir da `main`.

   ```bash
   git checkout -b <nome-da-branch>
   ```

2. **Faça as Alterações e Commits**:

   - Após fazer as alterações, siga as regras de commit acima.

3. **Sincronize com a `main`** (Opcional):

   - Antes de abrir um pull request, traga as mudanças mais recentes da `main` para evitar conflitos.

   ```bash
   git checkout main
   git pull origin main
   git checkout <nome-da-branch>
   git merge main
   ```

4. **Abra um Pull Request**:
   - Após finalizar suas alterações e commits, abra um pull request para que as mudanças sejam revisadas e integradas.

## Roadmap

### Versão 1.0

- [x] Configuração inicial do frontend e backend.
- [x] Implementação de rotas básicas de autenticação.
- [ ] Adicionar testes unitários ao backend.
- [ ] Configurar integração contínua (CI/CD).

### Versão 2.0

- [ ] Suporte a temas claro e escuro no frontend.
- [ ] Tradução para múltiplos idiomas.
- [ ] Integração com APIs externas para reconhecimento de voz.

```

```
