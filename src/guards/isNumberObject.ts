import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is Number object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isNumberObject(new Number(1));
 *
 * // false
 * isNumberObject(1);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isNumberObject = createTypeGuard<Number>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object Number]' ||
            value instanceof Number),
);
