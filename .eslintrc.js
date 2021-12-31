module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 13,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'array-element-newline': ['error', {'multiline': true, 'minItems': 3}],
    'comma-dangle': ['error', 'never'],
    'eol-last': ['error', 'always'],
    indent: ['error',
      2,
      {
        'SwitchCase': 1,
        'VariableDeclarator': {'var': 2, 'let': 2, 'const': 3}
      }
    ],
    'linebreak-style': ['error', 'unix'],
    '@typescript-eslint/no-unused-vars': ['error', {vars: 'all'}],
    'object-curly-spacing': ['error', 'never'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'keyword-spacing': ['error',
      {
        before: true,
        after: true,
        overrides: {
          catch: {after: false},
          if: {after: false},
          switch: {after: false}
        }
      }],
    'space-in-parens': ['error', 'never']
  }
}
