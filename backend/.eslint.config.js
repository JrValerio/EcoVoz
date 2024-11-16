import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.ts'], // Aplicar regras a todos os arquivos .ts
    ignores: ['dist/**', 'node_modules/**'], // Ignorar dist e node_modules
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        tsconfigRootDir: '.', // Diretório raiz onde o tsconfig está localizado
        project: './backend/tsconfig.json', // Caminho correto para o tsconfig
      },
    },
    plugins: {
      '@typescript-eslint': ts,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': ['error'], // Evitar variáveis não utilizadas
      '@typescript-eslint/no-explicit-any': 'warn', // Avisar sobre o uso de "any"
      '@typescript-eslint/consistent-type-imports': 'error', // Incentivar imports consistentes de tipos
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        { allowExpressions: true }, // Sugere a definição do tipo de retorno das funções
      ],
      'no-console': 'warn', // Avisar sobre o uso de console.log
      'prettier/prettier': 'error', // Integrar o Prettier ao ESLint
    },
  },
];
