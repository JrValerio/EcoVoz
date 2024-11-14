# EcoVoz Project

## Sobre o Projeto

**EcoVoz** é uma aplicação desenvolvida para auxiliar na acessibilidade e comunicação de pessoas com deficiência. O projeto faz parte do Hackathon Autismo Tech 2024 e visa criar uma solução inclusiva e eficiente.

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

### Fluxo de Trabalho

1. **Antes de Commits**: Certifique-se de que o código está formatado e de que não há erros de linting.
2. **Pre-commit Hooks**: O projeto está configurado para executar `lint-staged` e `husky` antes dos commits, o que ajudará a manter o código padronizado.

