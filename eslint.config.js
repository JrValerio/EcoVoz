import { fileURLToPath } from 'url';
import path from 'path';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import parser from '@typescript-eslint/parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default [
  {
    // Arquivos que serão analisados pelo ESLint
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],

    // Arquivos ou diretórios a serem ignorados
    ignores: [
      '**/dist/**',         // Ignorar pastas de build
      '**/node_modules/**', // Ignorar dependências instaladas
      '**/coverage/**',     // Ignorar relatórios de testes
      '**/*.config.js',     // Ignorar arquivos de configuração
      '**/*.config.cjs',    // Ignorar configurações em CommonJS
      '**/docker/**',       // Adicionar se usar Docker
      '**/.github/**',      // Ignorar workflows do GitHub Actions
    ],

    // Configurações da linguagem
    languageOptions: {
      parser, // Parser do TypeScript
      parserOptions: {
        ecmaVersion: 'latest', // Suporte ao JavaScript mais moderno
        sourceType: 'module',  // Uso de ES Modules
        project: [
          path.join(__dirname, './frontend/tsconfig.json'),  // Configuração do frontend
          path.join(__dirname, './backend/tsconfig.json'),   // Configuração do backend
          path.join(__dirname, './tsconfig.eslint.json'),    // Configuração compartilhada
        ],
      },
    },

    // Plugins utilizados
    plugins: {
      '@typescript-eslint': tsPlugin,
      'jsx-a11y': jsxA11y,
      
    },    
    // Regras de lint
    rules: {
      ...tsPlugin.configs.recommended.rules, // Regras recomendadas do TypeScript
      ...jsxA11y.configs.recommended.rules, // Regras recomendadas de acessibilidade
      'no-console': 'off',                  // Permitir console.log (útil em dev)
      '@typescript-eslint/no-unused-vars': 'warn', // Avisar sobre variáveis não usadas
      '@typescript-eslint/no-explicit-any': 'warn', // Avisar sobre o uso de `any`
      'prefer-const': 'warn',               // Incentivar uso de `const` sempre que possível
      "@typescript-eslint/no-unused-vars": [
      "warn",
      { "argsIgnorePattern": "^_" }
    ]
    },
  },
];
