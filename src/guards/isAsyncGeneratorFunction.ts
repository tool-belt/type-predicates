import { createTypeGuard, toObjectString } from '../utils';

export type TypedAsyncGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => AsyncGenerator<Y, R, N>;

/**
 * Checks that input is TypedAsyncGeneratorFunction<Y,R,N> object
 *
 * @remarks
 * - This guard works only in ES2018 and above
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, value is typed as TypedAsyncGeneratorFunction<unknown, unknown, unknown>
 * isAsyncGeneratorFunction(async function* () {
 *     while (true) {
 *         yield await Promise.resolve(true);
 *     }
 * });
 *
 * // true, value is typed as TypedAsyncGeneratorFunction<boolean, unknown, unknown>
 * isAsyncGeneratorFunction(async function* () {
 *     while (true) {
 *         yield await Promise.resolve(true);
 *     }
 * });
 *
 * // false
 * isAsyncGeneratorFunction(function* () {});
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isAsyncGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): input is TypedAsyncGeneratorFunction<Y, R, N> {
    return createTypeGuard<TypedAsyncGeneratorFunction<Y, R, N>>(
        (value) =>
            typeof value === 'function' &&
            toObjectString(value) === '[object AsyncGeneratorFunction]',
    )(input);
}
