module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    requireConfigFile: false,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  overrides: [
    {
      files: ['**/*.ts'],
      parser: '@typescript-eslint/parser',
      parserOptions: {
        sourceType: 'module',
        warnOnUnsupportedTypeScriptVersion: true,
      },
    },
  ],
  plugins: ['import', 'unused-imports'],
  extends: ['prettier'],
  rules: {
    'import/extensions': 'off',
    'no-underscore-dangle': 'off',
    'import/prefer-default-export': 'off',
    'unused-imports/no-unused-imports': 'warn',
    'import/newline-after-import': 'error',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: true },
        pathGroups: [
          {
            pattern: '@config/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@middlewares/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@utils/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '@routes/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: '$src/**',
            group: 'internal',
            position: 'after',
          },
          {
            pattern: './**',
            group: 'internal',
            position: 'after',
          },
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          'unknown',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
        ],
      },
    ],
  },
  settings: {
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.d.ts'],
    },
    'import/resolver': {
      [require.resolve('eslint-import-resolver-node')]: {
        extensions: ['.js', '.ts'],
      },
      [require.resolve('eslint-import-resolver-typescript')]: {
        alwaysTryTypes: true,
      },
    },
  },
  env: {
    browser: false,
    node: true,
    es2020: true,
  },
};
