import { BaseTypeGuardOptions } from '../types';
import { createTypeGuard } from './createTypeGuard';

/**
 * Checks that input is AsyncIterable
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
 * isAsyncIterable('');
 *
 * // false
 * isAsyncIterable(new String());
 *
 * // false
 * isAsyncIterable(new Set());
 *
 * // false
 * isAsyncIterable(new Map());
 *
 * // false
 * isAsyncIterable([]);
 *
 * // throws TypeError
 * isAsyncIterable({}, { throwError: true });
 * ```
 *
 * @typeParam T - Type of AsyncIterable
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isAsyncIterable<T = unknown>(
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is AsyncIterable<T> {
    return createTypeGuard<AsyncIterable<T>>(
        (value) => typeof (value as any)?.[Symbol.asyncIterator] === 'function',
        'AsyncIterable',
    )(input, { throwError });
}
