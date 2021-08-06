import { BaseTypeGuardOptions } from '../types';
import { createTypeGuard } from './createTypeGuard';
import { toObjectString } from '../utils';

export type TypedAsyncGeneratorFunction<Y, R, N> = (
    ...args: any[]
) => AsyncGenerator<Y, R, N>;

/**
 * Checks that input is AsyncGeneratorFunction
 *
 * @remarks
 * - This guard works only in ES2018 and above
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isAsyncGeneratorFunction(async function* () {});
 *
 * // false
 * isAsyncGeneratorFunction(function* () {});
 *
 * // throws TypeError
 * isAsyncGeneratorFunction(() => null, { throwError: true });
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isAsyncGeneratorFunction<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is TypedAsyncGeneratorFunction<Y, R, N> {
    return createTypeGuard<TypedAsyncGeneratorFunction<Y, R, N>>((value) => {
        const { constructor: AsyncGeneratorFunctionConstructor } =
            Object.getPrototypeOf(
                // eslint-disable-next-line @typescript-eslint/no-empty-function
                async function* () {},
            ) as { constructor: AsyncGeneratorFunction };
        return (
            typeof value === 'function' &&
            (toObjectString(value) === '[object AsyncGeneratorFunction]' ||
                value instanceof AsyncGeneratorFunctionConstructor)
        );
    }, 'async-generator-function')(input, { throwError });
}
