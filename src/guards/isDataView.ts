import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/** @category Type Guard */
export const isDataView = createTypeGuard<DataView>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object DataView]' ||
            value instanceof DataView),
);
