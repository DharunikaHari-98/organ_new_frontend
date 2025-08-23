module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(js|jsx)$': 'babel-jest',
    '^.+\\.(css|scss)$': 'jest-transform-css',
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(axios)/)', // transform axios
  ],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};
