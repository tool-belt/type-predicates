import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * @remarks
 * This guard works only in ES2018 and above
 * @category Type Guard
 */
export function isAsyncGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): input is AsyncGenerator<Y, R, N> {
    return createTypeGuard<AsyncGenerator<Y, R, N>>(
        (value) =>
            isObject(value) &&
            toObjectString(value) === '[object AsyncGenerator]',
    )(input);
}
