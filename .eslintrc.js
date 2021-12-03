module.exports = {
    root: true,
    plugins: ['eslint-plugin-tsdoc'],
    extends: ['@tool-belt/eslint-config'],
    parserOptions: {
        project: './tsconfig.json',
    },
    rules: {
        '@typescript-eslint/ban-types': 0,
        'tsdoc/syntax': 0,
        'jest/expect-expect': [
            'warn',
            {
                assertFunctionNames: ['expect', 'expectTypeOf'],
            },
        ],
    },
};
