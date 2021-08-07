import { TypeGuardBaseOptions } from '../types';
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
 *
 * // throws type error
 * isWeakMap(new Map([['abc', 'def']]), { throwError: true });
 * ```
 *
 * @typeParam K - Type of WeakMap keys, extends object
 * @typeParam V - Type of WeakMap values
 * @param input - Value to be tested
 * @param options - ThrowError, keyGuard, valueGuard
 * @returns Boolean
 * @throws TypeError
 */
export function isWeakMap<K extends object = any, V = unknown>(
    input: unknown,
    { throwError = false }: TypeGuardBaseOptions = {},
): input is WeakMap<K, V> {
    return createTypeGuard<WeakMap<K, V>>(
        (value) =>
            value instanceof WeakMap ||
            (isObject(value) && toObjectString(value) === '[object WeakMap]'),
        'weakMap',
    )(input, { throwError });
}
