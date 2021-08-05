import { OutputOptions } from 'rollup';
import { PackageJson } from 'type-fest';
import { terser } from 'rollup-plugin-terser';
import manifest from './package.json';
import typescript from '@rollup/plugin-typescript';

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
