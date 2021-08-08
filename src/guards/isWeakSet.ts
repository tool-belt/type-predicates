import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is WeakSet<T> object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, value is typed as WeakSet<any>
 * isWeakSet(new WeakSet([[myObj1, myObj2]]));
 *
 * // true, value is typed as WeakSet<MyObj>
 * isWeakSet<MyObj>(new WeakSet([[myObj1, myObj2]]));
 *
 * // false
 * isWeakSet<MyObj>(new Set([['xyz', 'abc']]));
 * ```
 *
 * @typeParam T - Type of WeakSet values, extends object and defaults to any
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isWeakSet<T extends object = any>(
    input: unknown,
): input is WeakSet<T> {
    return createTypeGuard<WeakSet<T>>(
        (value) =>
            value instanceof WeakSet ||
            (isObject(value) && toObjectString(value) === '[object WeakSet]'),
    )(input);
}
