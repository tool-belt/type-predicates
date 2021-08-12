import { createTypeGuard } from '../utils';
import { isObject } from './isObject';

/**
 * @remarks
 * This guard tests for the presence of a '.next' method on the object, which
 * defines the Iteration protocol. See:
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols}.
 *
 * At present it is not possible to distinguish between Iterator and
 * AsyncIterator using reflection.
 * @category Type Guard
 */
export function isIterator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): input is Iterator<Y, R, N> {
    return createTypeGuard<Iterator<Y, R, N>>(
        (value) =>
            isObject(value) && typeof Reflect.get(value, 'next') === 'function',
    )(input);
}
