import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is Boolean object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBooleanObject(new Boolean(true));
 *
 * // false
 * isBooleanObject(true);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isBooleanObject = createTypeGuard<Boolean>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object Boolean]' ||
            value instanceof Boolean),
);
