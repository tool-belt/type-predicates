import { createTypeAssertion } from '../utils';
import { isError } from '../guards/isError';

/**
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
 * // does not throw, value is typed as TypeError
 * assertIsError<TypeError>(new TypeError());
 *
 * // does not throw, value is typed as MyError - if MyError inherits from Error or its sub-classes
 * assertIsError<MyError>(new MyError());
 * ```
 *
 * @throws TypeError
 */
export function assertIsError<T extends Error = Error>(
    input: unknown,
): asserts input is T {
    return createTypeAssertion<T>(isError)(input);
}
