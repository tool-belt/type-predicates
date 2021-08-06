import { BaseTypeGuardOptions } from '../types';
import { createTypeGuard } from './createTypeGuard';

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
 * // throws TypeError
 * isIterable({}, { throwError: true });
 * ```
 *
 * @typeParam T - Type of Iterable
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export function isIterable<T = unknown>(
    input: unknown,
    { throwError }: BaseTypeGuardOptions = {},
): input is Iterable<T> {
    return createTypeGuard<Iterable<T>>(
        (value) => typeof (value as any)?.[Symbol.iterator] === 'function',
        'Iterable',
    )(input, { throwError });
}
