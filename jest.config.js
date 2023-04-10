export default {
  testPathIgnorePatterns: ['/node_modules/'],
  setupFilesAfterEnv: ['<rootDir>/setup-tests'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': '<rootDir>/node_modules/babel-jest',
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.tsx', '!src/**/*.spec.tsx'],
  coverageReporters: ['lcov', 'json'],
  moduleNameMapper: {
    '\\.(scss|css|sass)': 'identity-obj-proxy',
    '\\.(png|jpg|webp|ttf|woff|woff2|svg|mp4)$':
      '<rootDir>/src/mocks/fileMock.ts',
  },
}
