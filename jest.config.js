export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts'],
  testEnvironmentOptions: {
    node: { global: true },
    browser: { globals: { window: {} } },
  },
};
