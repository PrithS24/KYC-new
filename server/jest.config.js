/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src', '<rootDir>/tests'],
  moduleFileExtensions: ['js', 'json'],
  collectCoverageFrom: ['src/**/*.js', '!src/**/index.js'],
  resetMocks: true,
  clearMocks: true,
};
