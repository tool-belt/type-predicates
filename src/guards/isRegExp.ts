import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isRegExp(new RegExp('somePattern'));
 *
 * // true
 * isRegExp(/somePattern/);
 * ```
 */
export const isRegExp = createTypeGuard<RegExp>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object RegExp]' ||
            value instanceof RegExp),
);
