import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is SharedArrayBuffer object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isSharedArrayBuffer(new SharedArrayBuffer());
 *
 * // false
 * isSharedArrayBuffer([]);
 *
 * @param input - Value to be tested
 * @returns Boolean
 * ```
 */
export const isSharedArrayBuffer = createTypeGuard<SharedArrayBuffer>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object SharedArrayBuffer]' ||
            value instanceof SharedArrayBuffer),
);
