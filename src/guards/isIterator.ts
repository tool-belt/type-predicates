import { BaseTypeGuardOptions } from '../types';
import { createTypeGuard } from './createTypeGuard';
import { isFunction } from './isFunction';
import { isObject } from './isObject';

/**
 * Checks that input is Iterator
 *
 * @remarks
 * - At present it is not possible to use reflection to distinguish between sync
 *   and async iterators because the `next` method for both has a similar signature.
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isIterator(
 *     (function* () {
 *         yield true;
 *     })(),
 * );
 *
 * // also true
 * isIterator(
 *     (async function* () {
 *         yield Promise.resolve(true);
 *     })(),
 * );
 *
 * // true
 * isIterator(new Set().values());
 *
 * // true
 * isIterator(new Map().values());
 *
 * // false
 * isIterator(new String());
 *
 * // false
 * isIterator([]);
 *
 * // throws TypeError
 * isIterator({}, { throwError: true });
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
export function isIterator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Iterator<Y, R, N> {
    return createTypeGuard<Iterator<Y, R, N>>(
        (value) => isObject(value) && isFunction(Reflect.get(value, 'next')),
        'Iterator',
    )(input, { throwError });
}
