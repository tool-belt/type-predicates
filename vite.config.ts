import path from 'node:path';

// eslint-disable-next-line import/no-unresolved
import { PackageJson } from 'type-fest';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

import manifest from './package.json';

const { name } = manifest as PackageJson;
export default defineConfig({
    plugins: [dts({ rollupTypes: true })],
    build: {
        minify: true,
        lib: {
            fileName: 'index',
            name,
            entry: path.resolve(__dirname, 'src/index.ts'),
            formats: ['es', 'cjs'],
        },
    },
    test: {
        globals: true,
        include: ['tests/**/*.spec.ts'],
        coverage: {
            reporter: ['text', 'lcov'],
        },
    },
});
