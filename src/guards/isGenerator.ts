import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/** @category Type Guard */
export function isGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): input is Generator<Y, R, N> {
    return createTypeGuard<Generator<Y, R, N>>(
        (value) =>
            isObject(value) && toObjectString(value) === '[object Generator]',
    )(input);
}
