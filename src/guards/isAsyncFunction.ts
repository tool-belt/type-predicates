import { TypeGuardBaseOptions } from '../types';
import { createTypeGuard, toObjectString } from '../utils';

export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

/**
 * Checks that input is an AsyncFunction object
 *
 * @remarks
 * - This guard works only in ES2018 and above
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isAsyncFunction(async () => await Promise.resolve())
 *
 * // false
 * isAsyncFunction(() => null))
 *
 * // throws TypeError
 * isAsyncFunction(() => null, { throwError: true })
 * ```
 *
 * @typeParam T - Type of Promise return value, defaults to "any"
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isAsyncFunction<T = any>(
    input: unknown,
    { throwError = false }: TypeGuardBaseOptions = {},
): input is AsyncFunction<T> {
    return createTypeGuard<AsyncFunction<T>>((value) => {
        const { constructor: AsyncFunctionConstructor } = Object.getPrototypeOf(
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            async () => {},
        ) as { constructor: FunctionConstructor };
        return (
            typeof value === 'function' &&
            (toObjectString(value) === '[object AsyncFunction]' ||
                value instanceof AsyncFunctionConstructor)
        );
    }, 'async function')(input, { throwError });
}
