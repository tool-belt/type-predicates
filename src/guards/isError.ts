import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

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
 * ```
 *
 * @typeParam T - Error type, extends Error and defaults to Error
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isError<T extends Error = Error>(input: unknown): input is T {
    return createTypeGuard<T>(
        (value) =>
            isObject(value) &&
            (toObjectString(value) === '[object Error]' ||
                value instanceof Error),
    )(input);
}
