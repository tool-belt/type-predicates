import { createTypeGuard } from '../utils';
import { isObject } from './isObject';
import { isString } from './isString';

/**
 * @remarks
 * This guard tests for Symbol.iterator, which defines the Iterable protocol.
 * See:
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols}
 * @category Type Guard
 */
export function isIterable<T = unknown>(input: unknown): input is Iterable<T> {
    return createTypeGuard<Iterable<T>>(
        (value) =>
            (isObject(value) &&
                typeof Reflect.get(value, Symbol.iterator) === 'function') ||
            isString(value),
    )(input);
}
