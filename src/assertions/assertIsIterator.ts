import { createTypeAssertion } from '../utils';
import { isIterator } from '../guards/isIterator';

/**
 * Asserts that input is Iterator<Y, R, N> object
 *
 * @remarks
 * - This assertion works only in ES2018 and above
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Iterator<unknown, unknown, unknown>
 * assertIsIterator((function* () {
 *     while (true) {
 *         yield true;
 *     }
 * })());
 *
 * // does not throw, value is typed as Iterator<boolean, unknown, unknown>
 * assertIsIterator<boolean>((function* () {
 *     while (true) {
 *         yield true;
 *     }
 * })());
 *
 * // throws
 * assertIsIterator((async function* () {})());
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsIterator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): asserts input is Iterator<Y, R, N> {
    return createTypeAssertion<Iterator<Y, R, N>>(isIterator)(input);
}
