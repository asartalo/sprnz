module.exports = {
  env: {
    browser: false,
    es6: true,
  },
  extends: ['airbnb-base', 'plugin:mocha/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'import/extensions': ['error', { js: 'ignorePackages' }],
    'mocha/no-mocha-arrows': 'off',
    'no-underscore-dangle': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        mocha: true,
      },
      plugins: ['mocha'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'mocha/no-hooks-for-single-case': 'off',
        'func-names': 'off',
      },
    },
    {
      files: ['packages/*/lib/**/*.js'],
      plugins: ['jsdoc'],
      extends: ['plugin:jsdoc/recommended'],
      rules: {
        'jsdoc/require-description': 1,
      },
    },
    {
      files: ['scripts/**/*.js', 'support/*.js', './*.js'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
        'no-console': 'off',
      },
    },
    {
      files: ['packages/*/cjs/**/*.js', 'packages/*/node_modules/**/*.js'],
      rules: {
        'no-void': 'off',
      },
    },
  ],
};
