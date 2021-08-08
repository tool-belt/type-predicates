import { createTypeGuard, toObjectString } from '../utils';

export type TypedGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => Generator<Y, R, N>;

/**
 * Checks that input is GeneratorFunction
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isGeneratorFunction(function* () {});
 *
 * // false
 * isGeneratorFunction(async function* () {});
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): input is TypedGeneratorFunction<Y, R, N> {
    return createTypeGuard<TypedGeneratorFunction<Y, R, N>>(
        (value) =>
            typeof value === 'function' &&
            toObjectString(value) === '[object GeneratorFunction]',
    )(input);
}
