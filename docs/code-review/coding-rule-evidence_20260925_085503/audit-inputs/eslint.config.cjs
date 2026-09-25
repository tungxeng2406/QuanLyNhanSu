/** ESLint rules mapped to docs_requirement/javascript-coding-rules.md. */
const jsdoc = require('eslint-plugin-jsdoc');
const globals = require('globals');

module.exports = [
  {
    ignores: [
      'node_modules/**', 'target/**', 'playwright-report/**', 'test-results/**',
      'tests/unit_result/**', 'docs/test-evidence/**', 'docs/code-review/**'
    ]
  },
  {
    files: ['**/*.{js,cjs,mjs}'],
    plugins: { jsdoc },
    languageOptions: { ecmaVersion: 'latest', globals: globals.node },
    rules: {
      'no-var': 'error',
      'prefer-const': 'error',
      'eqeqeq': ['error', 'always'],
      'curly': ['error', 'all'],
      'semi': ['error', 'always'],
      'no-tabs': 'error',
      'one-var': ['error', 'never'],
      'default-case': 'error',
      'no-fallthrough': 'error',
      'brace-style': ['error', '1tbs'],
      'indent': ['error', 2, { SwitchCase: 1 }],
      'max-len': ['error', { code: 100, ignoreUrls: true }],
      'jsdoc/require-jsdoc': ['error', {
        publicOnly: { ancestorsOnly: false },
        require: {
          FunctionDeclaration: true, ClassDeclaration: true,
          MethodDefinition: true, ArrowFunctionExpression: true, FunctionExpression: true
        }
      }],
      'jsdoc/check-param-names': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/require-returns-description': 'error'
    }
  },
  {
    files: ['src/main/resources/static/**/*.js'],
    languageOptions: { sourceType: 'script', globals: globals.browser }
  },
  {
    files: ['e2e/**/*.js', 'scripts/**/*.js', '*.js', '**/*.cjs'],
    languageOptions: { sourceType: 'commonjs' }
  }
];
