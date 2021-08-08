import { createTypeAssertion } from '../utils';
import { isGenerator } from '../guards/isGenerator';

/**
 * Asserts that input is Generator<Y, R, N> object
 *
 * @remarks
 * - This assertion works only in ES2018 and above
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Generator<unknown, unknown, unknown>
 * assertIsGenerator((function* () {
 *     while (true) {
 *         yield true;
 *     }
 * })());
 *
 * // does not throw, value is typed as Generator<boolean, unknown, unknown>
 * assertIsGenerator((function* () {
 *     while (true) {
 *         yield true;
 *     }
 * })());
 *
 * // throws
 * assertIsGenerator((async function* () {})());
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): asserts input is Generator<Y, R, N> {
    return createTypeAssertion<Generator<Y, R, N>>(isGenerator)(input);
}
