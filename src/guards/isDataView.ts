import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is DataView object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isDataView(new DataView(new ArrayBuffer(8)));
 *
 * // false
 * isDataView('xyz');
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isDataView = createTypeGuard<DataView>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object DataView]' ||
            value instanceof DataView),
);
