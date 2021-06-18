module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  globals: {
    Parse: 'readonly',
    test: 'readonly',
    expect: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: ['airbnb-base', 'prettier'],
  rules: {
    'no-console': ['error'],
    'newline-before-return': 'error',
    'import/newline-after-import': 0,
    'no-use-before-define': 0,
    'max-len': ['error', { code: 140 }],
    'import/no-extraneous-dependencies': ['error', { packageDir: './' }],
    'no-param-reassign': ['error', { props: false }],
    'react/react-in-jsx-scope': 0,
    'import/prefer-default-export': 0,
    'import/extensions': 0,
    'no-underscore-dangle': 0,
    'object-curly-newline': 0,
    'implicit-arrow-linebreak': 0,
    'operator-linebreak': 0,
    'linebreak-style': 0,
    'function-paren-newline': 0,
    'no-await-in-loop': 0,
    'no-plusplus': 0,
    'arrow-body-style': 0,
    '@typescript-eslint/no-floating-promises': 'error',
    camelcase: 0,
    'no-void': 0,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.json', '.native.js', '.tsx', '.ts'],
        moduleDirectory: ['node_modules', './'],
      },
    },
  },
};
