import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is Generator object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isGenerator<boolean>(
 *     (function* () {
 *         yield true;
 *     })(),
 * );
 *
 * // false
 * isGenerator(
 *     (async function* () {
 *         yield true;
 *     })(),
 * );
 * ```
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): input is Generator<Y, R, N> {
    return createTypeGuard<Generator<Y, R, N>>(
        (value) =>
            isObject(value) && toObjectString(value) === '[object Generator]',
    )(input);
}
