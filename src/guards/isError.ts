import { BaseTypeGuardOptions } from '../types';
import { createTypeGuard } from './createTypeGuard';
import { isObject } from './isObject';
import { toObjectString } from '../utils';

/**
 * Checks that input is Error object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isError(new Error());
 *
 * // true
 * isError(new TypeError());
 *
 * // true
 * isError(new RangeError());
 *
 * // true, as long as MyCustomError inherits Error
 * isError(new MyCustomError());
 *
 * // false
 * isError({});
 *
 * // false
 * isError(1);
 *
 * // throws TypeError
 * isError([], { throwError: true });
 * ```
 *
 * @typeParam T - Error type
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isError<T extends Error = Error>(
    input: unknown,
    { throwError = false }: BaseTypeGuardOptions = {},
): input is T {
    return createTypeGuard<T>(
        (value) =>
            isObject(value) &&
            (toObjectString(value) === '[object Error]' ||
                value instanceof Error),
        'Error',
    )(input, { throwError });
}
