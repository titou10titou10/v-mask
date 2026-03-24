import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';

export default [
  {
    files: ['src/**/*.ts'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      // tslint:recommended base equivalents
      ...tseslint.configs.recommended.rules,

      // interface-name: false → no prefix enforcement
      '@typescript-eslint/naming-convention': 'off',

      // max-line-length: [true, 80]
      'max-len': ['error', { code: 100 }],

      // no-console: [true, "time", "timeEnd", "trace"]
      'no-console': ['error', { allow: ['time', 'timeEnd', 'trace'] }],

      // no-string-literal: false
      '@typescript-eslint/dot-notation': 'off',

      // object-literal-sort-keys: false
      // (no direct ESLint equivalent needed — off by default)

      // ordered-imports: false
      // (no direct ESLint equivalent needed — off by default)

      // quotemark: [true, "single", "avoid-escape"]
      'quotes': ['error', 'single', { avoidEscape: true }],

      // trailing-comma: false
      'comma-dangle': ['error', 'never'],

      // variable-name: allow-leading-underscore, ban-keywords, check-format
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variable', 'function', 'parameter', 'property', 'method', 'class', 'interface', 'typeAlias', 'enum', 'enumMember', 'typeParameter'],
          format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
          leadingUnderscore: 'allow',
        },
        {
          selector: 'objectLiteralProperty',
          format: null, // no restriction — allows '#', '!', 'X', etc.
        },
      ],

      // only-arrow-functions: false
      'prefer-arrow-callback': 'off',
    },
  },
];