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
 * isDataView(new DataView());
 *
 * // false
 * isDataView('xyz');
 *
 * // false
 * isDataView(1);
 *
 * // throws TypeError
 * isDataView([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isDataView = createTypeGuard<DataView>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object DataView]' ||
            value instanceof DataView),
    'DataView',
);
