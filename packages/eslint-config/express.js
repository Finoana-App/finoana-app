import path from 'node:path';
import { fileURLToPath } from 'node:url';

import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import perfectionist from 'eslint-plugin-perfectionist';

import { config as baseConfig } from './base.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * A custom ESLint configuration for Express / Node.js applications.
 *
 * @type {import("eslint").Linter.Config}
 */
export const expressConfig = [
  ...baseConfig,
  {
    ignores: ['**/*.js', 'dist/**', 'src/generated/**'],
  },

  js.configs.recommended,
  eslintConfigPrettier,

  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,

  {
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        projectService: true,
        tsconfigRootDir: __dirname,
      },
      globals: {
        ...globals.node,
      },
    },
  },

  perfectionist.configs['recommended-natural'],

  {
    rules: {
      // Express / backend-friendly rules
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: false },
      ],
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      'no-console': 'off',
    },
  },

  {
    files: ['**/*.test.ts', '**/*.spec.ts'],
    rules: {
      '@typescript-eslint/unbound-method': 'off',
    },
  },
];
