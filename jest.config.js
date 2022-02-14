/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@config/(.*)': '<rootDir>/src/config/$1',
    '@middlewares/(.*)': '<rootDir>/src/middlewares/$1',
    '@routes/(.*)': '<rootDir>/src/routes/$1',
    '@utils/(.*)': '<rootDir>/src/utils/$1',
    '@src/(.*)': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/src/config/',
    '<rootDir>/certs/',
    '<rootDir>/public/',
    '<rootDir>/dist/',
  ],
  globalSetup: './jest/setup.js',
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/**/*.ts',
    '!<rootDir>/src/config/*',
    '!<rootDir>/src/index.ts',
    '!<rootDir>/src/docs.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: -10,
    },
  },
};
