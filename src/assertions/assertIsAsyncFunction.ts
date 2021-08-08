import { AsyncFunction, isAsyncFunction } from '../guards/isAsyncFunction';
import { createTypeAssertion } from '../utils';

/**
 * Asserts that input is AsyncFunction<T> object
 *
 * @remarks
 * - This assertion works only in ES2018 and above
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as AsyncFunction<unknown>
 * assertIsAsyncFunction(async () => await Promise.resolve())
 *
 * // does not throw, value is typed as AsyncFunction<boolean>
 * assertIsAsyncFunction<boolean>(async () => await Promise.resolve(true))
 *
 * // throws
 * assertIsAsyncFunction([]);
 *
 * @typeParam T - Type of Promise return value, defaults to unknown
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsAsyncFunction<T = unknown>(
    input: unknown,
): asserts input is AsyncFunction<T> {
    return createTypeAssertion<AsyncFunction<T>>(isAsyncFunction)(input);
}
