import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is WeakMap object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, typed as WeakMap<any, unknown>
 * isWeakMap(new WeakMap([[myObj, 'abc']]));
 *
 * // true, typed as WeakMap<MyObj, string>
 * isWeakMap<MyObj, string>(new WeakMap([[myObj, 'abc']]));
 *
 * // false
 * isWeakMap<MyObj, string>(new Map([['abc', 'def']]));
 * ```
 *
 * @typeParam K - Type of WeakMap keys, extends object
 * @typeParam V - Type of WeakMap values
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isWeakMap<K extends object = any, V = unknown>(
    input: unknown,
): input is WeakMap<K, V> {
    return createTypeGuard<WeakMap<K, V>>(
        (value) =>
            value instanceof WeakMap ||
            (isObject(value) && toObjectString(value) === '[object WeakMap]'),
    )(input);
}
