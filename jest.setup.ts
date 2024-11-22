import '@testing-library/jest-dom';

export default {
  // Configurações básicas
  preset: 'ts-jest', // Suporte para TypeScript
  testEnvironment: 'jsdom', // Simula o DOM para testes de frontend

  // Configurações de inicialização
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Configurações adicionais do Jest DOM

  // Transformação de arquivos
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos TypeScript
  },

  // Mapeamento de módulos (arquivos que devem ser mockados nos testes)
  moduleNameMapper: {
    '\\.(css|scss|sass)$': 'identity-obj-proxy', // Ignora arquivos de estilo nos testes
    '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock para imagens
  },

  // Detectar arquivos de teste
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Testa arquivos com extensões especificadas

  // Relatórios de cobertura
  collectCoverage: true, // Gera relatório de cobertura de código
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}', // Inclui arquivos TypeScript no relatório
    '!src/**/*.d.ts',    // Exclui arquivos de definição
    '!src/**/index.ts',  // Exclui arquivos index para evitar redundâncias
    '!src/setupTests.ts', // Exclui configurações de teste
    '!src/**/mocks/**',  // Exclui mocks (se houver)
  ],
  coverageReporters: ['text', 'lcov', 'json', 'html'], // Formatos de relatório para diferentes usos

  // Outras configurações
  testPathIgnorePatterns: ['/node_modules/', '/dist/'], // Ignora arquivos irrelevantes
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'], // Extensões aceitas
};
