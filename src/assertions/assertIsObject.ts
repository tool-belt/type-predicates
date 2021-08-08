import { createTypeAssertion } from '../utils';
import { isObject } from '../guards/isObject';

/**
 * Asserts that input is object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as object
 * assertIsObject({});
 *
 * // does not throw, value is typed as object
 * assertIsObject([]);
 *
 * // throws
 * assertIsObject('abc');
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsObject = createTypeAssertion<object>(isObject);
