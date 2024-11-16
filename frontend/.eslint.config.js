export default [
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        project: 'frontend/tsconfig.json',
      },
    },
  },
];
