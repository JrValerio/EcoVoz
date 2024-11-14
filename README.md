# EcoVoz Project

## Sobre o Projeto

**EcoVoz** é uma aplicação desenvolvida para auxiliar na acessibilidade e comunicação de pessoas com deficiência. O projeto faz parte do Hackathon Autismo Tech 2024 e visa criar uma solução inclusiva e eficiente.

## O que o Projeto Já Possui

Até o momento, o projeto EcoVoz inclui:

1. **Configuração do Frontend**:
   - Estrutura inicial do React com TypeScript.
   - Configuração do Vite como ferramenta de build.
   - Integração com Redux para gerenciamento de estado global.

2. **Configuração do Backend**:
   - Estrutura básica para o servidor.
   - Configuração inicial do TypeScript e Express.

3. **Ferramentas de Linting e Formatação**:
   - **ESLint** para manter a qualidade do código.
   - **Prettier** para formatação consistente.
   - **Husky** e **lint-staged** para verificação automática antes dos commits.

4. **Estrutura Inicial de Componentes e Estado**:
   - Exemplo de componente `Header` com integração de login e logout usando Redux.
   - Configuração básica para adicionar mais componentes e lógica de estado.

## Como Clonar o Repositório e Iniciar o Projeto

### 1. Clonando o Repositório

Primeiro, faça o clone do repositório para sua máquina local:

```bash
git clone https://github.com/JrValerio/EcoVoz.git
cd EcoVoz
```

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

### 4. Estrutura do Projeto

- `frontend/`: Contém o código do frontend (React).
- `backend/`: Contém o código do backend (Express).
- `.husky/`: Configurações para hooks de commits.
- `.eslintrc.js`, `.prettierrc`, `.editorconfig`: Arquivos de configuração para formatação e linting.

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

### Exemplos de Commits

Aqui estão alguns exemplos de commits seguindo o padrão semântico:

- `feat(backend): add status route to check API health`
- `fix(frontend): correct conditional rendering in Header component`
- `docs: add contribution guidelines to README`
- `style(components): format Header component with prettier`
- `refactor(auth): simplify login logic`
- `chore: configure husky pre-commit hooks`
- `test(redux): add tests for user slice actions`

### Boas Práticas para Commit

1. **Commits Frequentes**: Faça commits frequentemente para salvar o progresso e facilitar o controle de versão.
2. **Commits Pequenos**: Tente dividir grandes alterações em commits menores e focados.
3. **Clareza**: Escreva descrições claras para que todos no grupo compreendam rapidamente a mudança.

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

