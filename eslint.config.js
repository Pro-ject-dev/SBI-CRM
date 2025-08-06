module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['react'],
  rules: {
    // ✅ Flag unused variables as errors
    'no-unused-vars': ['error', { vars: 'all', args: 'after-used', ignoreRestSiblings: true }],

    // Optional: Auto-ignore unused function args or vars starting with "_"
    // 'no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

    // Optional: Turn off if using TypeScript and letting ts handle it
    // 'no-unused-vars': 'off',

    // Other useful rules
    'react/react-in-jsx-scope': 'off', // For React 17+
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
