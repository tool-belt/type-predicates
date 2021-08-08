import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is RegExp object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isRegExp(new RegExp('somePattern'));
 *
 * // true
 * isRegExp(/somePattern/);
 *
 * // false
 * isRegExp('xyz');
 *
 * // false
 * isRegExp({});
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isRegExp = createTypeGuard<RegExp>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object RegExp]' ||
            value instanceof RegExp),
);
