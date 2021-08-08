import { createTypeAssertion } from '../utils';
import { isIterable } from '../guards/isIterable';

/**
 * Asserts that input is Iterable<T> object
 *
 * @remarks
 * - This guard tests for Symbol.iterator, which defines the Iterable protocol.
 *   See:
 *   {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols}
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Iterable<unknown>
 * assertIsIterable(
 *     (function* () {
 *         yield true;
 *     })(),
 * );
 *
 * // does not throw, value is typed as Iterable<string>
 * assertIsIterable<string>('');
 *
 * // throws
 * assertIsIterable({});
 *
 * @typeParam T - Type of Iterable, defaults to unknown
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsIterable<T = unknown>(
    input: unknown,
): asserts input is Iterable<T> {
    return createTypeAssertion<Iterable<T>>(isIterable)(input);
}
