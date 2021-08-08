import { createTypeAssertion } from '../utils';
import { isError } from '../guards/isError';

/**
 * Asserts that input is Error object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Error
 * assertIsError(new Error());
 *
 * // does not throw, value is typed as Error
 * assertIsError<TypeError>(new TypeError());
 *
 * // does not throw, value is typed as MyError - if MyError inherits from Error or its sub-classes
 * assertIsError<MyError>(new MyError());
 *
 * // throws
 * assertIsError({});
 * ```
 *
 * @typeParam T - Error type, extends Error and defaults to Error
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export function assertIsError<T extends Error = Error>(
    input: unknown,
): asserts input is T {
    return createTypeAssertion<T>(isError)(input);
}
