import '@testing-library/jest-dom';

export default {
    preset: 'ts-jest', // Suporte para TypeScript
    testEnvironment: 'jsdom', // Simula o DOM para testes de frontend
    setupFilesAfterEnv: ['@testing-library/jest-dom'], // Configurações adicionais do Jest DOM
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transforma arquivos TypeScript
    },
    moduleNameMapper: {
      '\\.(css|scss|sass)$': 'identity-obj-proxy', // Ignora arquivos de estilo nos testes
      '\\.(jpg|jpeg|png|gif|webp|svg)$': '<rootDir>/__mocks__/fileMock.js', // Mock para imagens
    },
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'], // Arquivos de teste aceitos
    collectCoverage: true, // Gera relatório de cobertura de código
    collectCoverageFrom: ['src/**/*.{ts,tsx}', '!src/**/*.d.ts'], // Inclui arquivos para cobertura
    coverageReporters: ['text', 'lcov'], // Formatos do relatório
  };
  