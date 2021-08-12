import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isError(new Error());
 *
 * // true, value is typed as Error
 * isError(new TypeError());
 *
 * // true, value is typed as TypeError
 * isError<TypeError>(new TypeError());
 *
 * // true, as long as MyCustomError inherits Error
 * isError<MyCustomError>(new MyCustomError());
 * ```
 */
export function isError<T extends Error = Error>(input: unknown): input is T {
    return createTypeGuard<T>(
        (value) =>
            isObject(value) &&
            (toObjectString(value) === '[object Error]' ||
                value instanceof Error),
    )(input);
}
