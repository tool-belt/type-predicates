import { createTypeGuard, toObjectString } from '../utils';

/**
 * Checks that input is a function
 *
 * @remarks
 * - This function excludes class declarations
 * - This guard works only in ES2018 and above
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, value is typed as Function
 * isFunction(() => null);
 *
 * // true, value is typed as () => null
 * isFunction<() => null>(() => null);
 *
 * // false
 * isFunction(async () => Promise.resolve(null));
 *
 * // false
 * isFunction(function* () {});
 *
 * // false
 * isFunction(async function* () {});
 *
 * // false
 * isFunction(MyClass);
 * ```
 *
 * @typeParam T - Function type, defaults to "Function"
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isFunction<T extends Function = Function>(
    input: unknown,
): input is T {
    return createTypeGuard<T>(
        (value) =>
            typeof value === 'function' &&
            toObjectString(value) === '[object Function]',
    )(input);
}
