import typescript from '@rollup/plugin-typescript';
import { OutputOptions } from 'rollup';
import { terser } from 'rollup-plugin-terser';
// eslint-disable-next-line import/no-unresolved
import { PackageJson } from 'type-fest';

import manifest from './package.json';

const { module, main } = manifest as PackageJson;

const output: OutputOptions[] = [
    {
        exports: 'named',
        sourcemap: true,
        file: module,
        format: 'es',
    },
    {
        exports: 'named',
        sourcemap: true,
        file: main,
        format: 'cjs',
    },
];

export default {
    input: 'src/index.ts',
    output,
    plugins: [
        typescript({
            tsconfig: './tsconfig.build.json',
        }),
        terser(),
    ],
};
