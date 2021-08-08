import { createTypeGuard } from '../utils';
import { isObject } from './isObject';
import { isString } from './isString';

/**
 * Checks that input is Iterable
 *
 * @remarks
 * - This guard tests for Symbol.iterator, which defines the Iterable protocol.
 *   See:
 *   {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols}
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isIterable(
 *     (function* () {
 *         yield true;
 *     })(),
 * );
 *
 * // true
 * isIterable('');
 *
 * // true
 * isIterable(new String());
 *
 * // true
 * isIterable(new Set());
 *
 * // true
 * isIterable(new Map());
 *
 * // true
 * isIterable([]);
 *
 * // false
 * isIterable({});
 * ```
 *
 * @typeParam T - Type of Iterable
 * @param input - Value to be tested
 * @returns Boolean
 */
export function isIterable<T = unknown>(input: unknown): input is Iterable<T> {
    return createTypeGuard<Iterable<T>>(
        (value) =>
            (isObject(value) &&
                typeof Reflect.get(value, Symbol.iterator) === 'function') ||
            isString(value),
    )(input);
}
