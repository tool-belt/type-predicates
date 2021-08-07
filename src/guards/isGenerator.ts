import { TypeGuardBaseOptions } from '../types';
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
 *
 * // throws TypeError
 * isGenerator({}, { throwError: true });
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
export function isGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    { throwError = false }: TypeGuardBaseOptions = {},
): input is Generator<Y, R, N> {
    return createTypeGuard<Generator<Y, R, N>>(
        (value) =>
            isObject(value) && toObjectString(value) === '[object Generator]',
        'generator',
    )(input, { throwError });
}
