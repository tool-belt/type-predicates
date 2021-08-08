import { createTypeAssertion } from '../utils';
import { isAsyncGenerator } from '../guards/isAsyncGenerator';

/**
 * Asserts that input is AsyncGenerator<Y, R, N> object
 *
 * @remarks
 * - This assertion works only in ES2018 and above
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as AsyncGenerator<unknown, unknown, unknown>
 * assertIsAsyncGenerator((async function* () {
 *     while (true) {
 *         yield await Promise.resolve(true);
 *     }
 * })());
 *
 * // does not throw, value is typed as AsyncGenerator<boolean, unknown, unknown>
 * assertIsAsyncGenerator<boolean>((async function* () {
 *     while (true) {
 *         yield await Promise.resolve(true);
 *     }
 * })());
 *
 * // throws
 * assertIsAsyncGenerator((function* () {})());
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsAsyncGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): asserts input is AsyncGenerator<Y, R, N> {
    return createTypeAssertion<AsyncGenerator<Y, R, N>>(isAsyncGenerator)(
        input,
    );
}
