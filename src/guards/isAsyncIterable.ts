import { createTypeGuard } from '../utils';
import { isObject } from './isObject';

/**
 * @remarks
 * This guard tests for Symbol.asyncIterator. See:
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator}
 * @category Type Guard
 */
export function isAsyncIterable<T = unknown>(
    input: unknown,
): input is AsyncIterable<T> {
    return createTypeGuard<AsyncIterable<T>>(
        (value) =>
            isObject(value) &&
            typeof Reflect.get(value, Symbol.asyncIterator) === 'function',
    )(input);
}
