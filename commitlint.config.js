module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [2, 'always', 72], // Limita o tamanho da mensagem do cabeçalho
    'type-enum': [
      2,
      'always',
      [
        'feat', // Funcionalidades novas
        'fix',  // Correções de bugs
        'docs', // Documentação
        'style', // Estilo (formatos, espaços, etc.)
        'refactor', // Refatoração de código
        'test', // Testes
        'chore', // Outras tarefas
      ],
    ],
  },
};
