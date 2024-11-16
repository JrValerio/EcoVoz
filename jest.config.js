module.exports = {
  preset: 'ts-jest', 
  testEnvironment: 'jsdom', 
  moduleNameMapper: {
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy', 
  },
  transform: {
    '^.+\\.tsx?$': 'ts-jest', 
  },
  transformIgnorePatterns: [
    '/node_modules/', 
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'], 
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/tests/'], 
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
