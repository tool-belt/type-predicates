import { createTypeGuard } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is AsyncIterable<T>
 *
 * @remarks
 * - This guard tests for Symbol.asyncIterator. See:
 *   {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator}
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isAsyncIterable(
 *     (async function* () {
 *         yield Promise.resolve(true);
 *     })(),
 * );
 *
 * // false
 * isAsyncIterable({});
 * ```
 *
 * @typeParam T - Type of AsyncIterable, defaults to unknown
 * @param input - Value to be tested
 * @returns Boolean
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
