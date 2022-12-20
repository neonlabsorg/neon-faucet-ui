module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  plugins: ['prettier'],
  'rules': {
    semi: 'off',
    'comma-dangle': 0,
    '@typescript-eslint/semi': [
      'off'
    ],
    '@typescript-eslint/no-empty-interface': [
      'error',
      {
        'allowSingleExtends': true
      }
    ],
    '@typescript-eslint/no-var-requires': 'off',
  }
}
