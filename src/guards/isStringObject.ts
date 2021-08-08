import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is String object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isStringObject(new String('xyz'));
 *
 * // false
 * isStringObject('xyz');
 *
 * // false
 * isStringObject(1);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isStringObject = createTypeGuard<String>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object String]' ||
            value instanceof String),
);
