import { createTypeGuard, toObjectString } from '../utils';

/**
 * @remarks
 * This guard works only in ES2018 and above
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
