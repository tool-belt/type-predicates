import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/** @category Type Guard */
export const isSharedArrayBuffer = createTypeGuard<SharedArrayBuffer>(
    (value) =>
        isObject(value) &&
        (toObjectString(value) === '[object SharedArrayBuffer]' ||
            value instanceof SharedArrayBuffer),
);
