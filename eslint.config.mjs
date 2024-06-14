import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    files: ['**/*.ts', '**/*.tsx'],
    // languageOptions: {
    //   parser: '@typescript-eslint/parser',
    //   parserOptions: {
    //     project: './tsconfig.json'
    //   }
    // },
    plugins: {
      '@typescript-eslint': '@typescript-eslint/eslint-plugin',
      'prettier': 'eslint-plugin-prettier'
    },
    extends: [
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
      'prettier'
    ],
    rules: {
      // 'nuxt/prefer-import-meta': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'prettier/prettier': ['error', {
        singleQuote: true,
        semi: false,
      }],
    }
  }
)
