module.exports = {
    root: true,
    plugins: ['eslint-plugin-tsdoc'],
    extends: ['@sprylab/eslint-config'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        'sonarjs/cognitive-complexity': ['error', 20],
        'tsdoc/syntax': 'warn',
        'jest/expect-expect': [
            'warn',
            {
                assertFunctionNames: ['expect', 'expectTypeOf'],
            },
        ],
    },
};
