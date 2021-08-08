import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is Date object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isDate(new Date());
 *
 * // false
 * isDate('xyz');
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isDate = createTypeGuard<Date>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object Date]' || value instanceof Date),
);
