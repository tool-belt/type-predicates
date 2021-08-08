import { createTypeGuard, toObjectString } from '../utils';

export type AsyncFunction<T = any> = (...args: any[]) => Promise<T>;

/**
 * Checks that input is an AsyncFunction<T> object
 *
 * @remarks
 * - This guard works only in ES2018 and above
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, value is typed as AsyncFunction<any>
 * isAsyncFunction(async () => await Promise.resolve())
 *
 * // true, value is typed as AsyncFunction<boolean>
 * isAsyncFunction<boolean>(async () => await Promise.resolve(true))
 *
 * // false
 * isAsyncFunction(() => null))
 * ```
 *
 * @typeParam T - Type of Promise return value, defaults to "any"
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isAsyncFunction<T = any>(
    input: unknown,
): input is AsyncFunction<T> {
    return createTypeGuard<AsyncFunction<T>>((value) => {
        const { constructor: AsyncFunctionConstructor } = Object.getPrototypeOf(
            async () => Promise.resolve(),
        ) as { constructor: FunctionConstructor };
        return (
            typeof value === 'function' &&
            (toObjectString(value) === '[object AsyncFunction]' ||
                value instanceof AsyncFunctionConstructor)
        );
    })(input);
}
