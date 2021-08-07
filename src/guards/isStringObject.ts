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
 *
 * // throws TypeError
 * isStringObject([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isStringObject = createTypeGuard<String>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object String]' ||
            value instanceof String),
    'String',
);
