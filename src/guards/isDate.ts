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
 *
 * // false
 * isDate(1);
 *
 * // throws TypeError
 * isDate([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isDate = createTypeGuard<Date>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object Date]' || value instanceof Date),
    'Date',
);
