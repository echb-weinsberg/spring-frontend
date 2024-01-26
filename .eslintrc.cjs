module.exports = {
  extends: ['mantine'],
  parserOptions: {
    project: './webapp/tsconfig.json',
  },
  rules: {
    'react/react-in-jsx-scope': 'off',
    'import/extensions': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'consistent-return': 'off',
    'import/order': 'off',
    '@typescript-eslint/dot-notation': 'off',
    'react/jsx-closing-tag-location': 'off',
  },
};
