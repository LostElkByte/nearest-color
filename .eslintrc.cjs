module.exports = {
  root: true,
  env: {
    node: true,
    es6: true,
  },
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // 在这里添加你的规则
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
    'no-empty': ['error', { allowEmptyCatch: true }], // 允许空的代码块语句
    'no-console': 'off', // 允许使用 console
    'no-unused-vars': 'warn', // 警告未使用的变量
    semi: ['error', 'always'], // 强制使用分号
    quotes: ['error', 'single'], // 强制使用单引号
    indent: ['error', 2], // 缩进为2个空格
    // 更多规则...
  },
};
