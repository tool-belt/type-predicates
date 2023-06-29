module.exports = {
    root: true,
    plugins: ['eslint-plugin-tsdoc'],
    extends: ['@tool-belt/eslint-config'],
    parserOptions: {
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.js', '**/*.js', '*.js'],
    rules: {
        '@typescript-eslint/unified-signatures': 0,
        '@typescript-eslint/ban-types': 0,
        '@typescript-eslint/no-extraneous-class': 0,
        'tsdoc/syntax': 0,
    },
};
