import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is ArrayBuffer object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isArrayBuffer(new ArrayBuffer());
 *
 * // false
 * isArrayBuffer('xyz');
 *
 * // false
 * isArrayBuffer(1);
 *
 * // throws TypeError
 * isArrayBuffer([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isArrayBuffer = createTypeGuard<ArrayBuffer>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object ArrayBuffer]' ||
            value instanceof ArrayBuffer),
    'ArrayBuffer',
);
