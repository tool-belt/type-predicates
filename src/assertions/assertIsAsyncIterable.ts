import { createTypeAssertion } from '../utils';
import { isAsyncIterable } from '../guards/isAsyncIterable';

/**
 * Asserts that input is AsyncIterable<T> object
 *
 * @remarks
 * - This guard tests for Symbol.asyncIterator. See:
 *   {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator}
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as AsyncIterable<unknown>
 * assertIsAsyncIterable((async function* () {
 *   yield Promise.resolve(true);
 * }()))
 *
 * // does not throw, value is typed as AsyncIterable<boolean>
 * assertIsAsyncIterable<boolean>((async function* () {
 *   yield Promise.resolve(true);
 * }()))
 *
 * // throws
 * assertIsAsyncIterable({});
 *
 * @typeParam T - Type of AsyncIterable, defaults to unknown
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsAsyncIterable<T = unknown>(
    input: unknown,
): asserts input is AsyncIterable<T> {
    return createTypeAssertion<AsyncIterable<T>>(isAsyncIterable)(input);
}
