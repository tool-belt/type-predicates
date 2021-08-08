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
 * isArrayBuffer([]);
 *
 * @param input - Value to be tested
 * @returns Boolean
 * @throws TypeError
 * ```
 */
export const isArrayBuffer = createTypeGuard<ArrayBuffer>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object ArrayBuffer]' ||
            value instanceof ArrayBuffer),
);
