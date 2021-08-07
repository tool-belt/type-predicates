import { TypeGuardBaseOptions } from '../types';
import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is WeakSet object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, typed as WeakSet<any>
 * isWeakSet(new WeakSet([[myObj1, myObj2]]));
 *
 * // true, typed as WeakSet<MyObj>
 * isWeakSet<MyObj>(new WeakSet([[myObj1, myObj2]]));
 *
 * // false
 * isWeakSet<MyObj>(new Set([['xyz', 'abc']]));
 *
 * // throws type error
 * isWeakSet<MyObj>(new Set([['xyz', 'abc']]), { throwError: true });
 * ```
 *
 * @typeParam T - Type of WeakSet values, extends object
 * @param input - Value to be tested
 * @param options - ThrowError, keyGuard, valueGuard
 * @returns Boolean
 * @throws TypeError
 */
export function isWeakSet<T extends object = any>(
    input: unknown,
    { throwError = false }: TypeGuardBaseOptions = {},
): input is WeakSet<T> {
    return createTypeGuard<WeakSet<T>>(
        (value) =>
            value instanceof WeakSet ||
            (isObject(value) && toObjectString(value) === '[object WeakSet]'),
        'weakMap',
    )(input, { throwError });
}
