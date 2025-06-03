import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    ignores: [
      'node_modules/',
      'dist/',
      'build/',
      '.next/',
      'coverage/',
      'public/',
      '**/generated/**',
    ],
    plugins: ['prettier'],
    rules: {
      'prettier/prettier': [
        'error',
        {
          semi: false,
          singleQuote: true,
          trailingComma: 'es5',
        },
      ],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-non-null-asserted-optional-chain': 'off',
      '@typescript-eslint/no-var-requires': 0,
      indent: ['off', 2, { switchCase: 4 }],
      'linebreak-style': ['off', 'unix'],
      'no-console': 'warn',
      'no-unused-vars': 'off',
      semi: ['error', 'never'],
      'react/no-unescaped-entities': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'react/prop-types': 'off',
      'react/no-unknown-property': 'off',
      'no-extra-boolean-cast': 'off',
      'unused-imports/no-unused-imports': 'off',
      'unused-imports/no-unused-vars': 'off',
      'no-unused-vars': 'off',
    },
  },
]

export default eslintConfig
