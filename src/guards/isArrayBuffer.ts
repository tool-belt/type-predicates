import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/** @category Type Guard */
export const isArrayBuffer = createTypeGuard<ArrayBuffer>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object ArrayBuffer]' ||
            value instanceof ArrayBuffer),
);
