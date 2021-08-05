module.exports = {
    root: true,
    plugins: ['eslint-plugin-tsdoc'],
    extends: ['@sprylab/eslint-config'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/ban-types': 0,
        'tsdoc/syntax': 'warn',
        'jest/expect-expect': [
            'warn',
            {
                assertFunctionNames: ['expect', 'expectTypeOf'],
            },
        ],
    },
};
