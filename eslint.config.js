// eslint.config.js
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: ['dist'], // replaces globalIgnores
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      'prefer-const': 'off',
      'react/jsx-key': 'off',
      'no-unused-vars': 'warn',
      'react/display-name': 'off',
      'react/no-unescaped-entities': 'off',
      'import/no-anonymous-default-export': 'off',

      // TypeScript rules
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/ban-types': [
        'off',
        {
          extendDefaults: true,
          types: {
            '{}': false,
          },
        },
      ],

      // Style tweaks
      'lines-around-comment': [
        'off',
        {
          beforeLineComment: 'off',
          beforeBlockComment: 'off',
          allowBlockStart: 'off',
          allowClassStart: 'off',
          allowObjectStart: 'off',
          allowArrayStart: 'off',
        },
      ],
      'newline-before-return': 'off',
      'import/newline-after-import': [
        'off',
        {
          count: 1,
        },
      ],
    },
  },
])