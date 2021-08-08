import { createTypeAssertion } from '../utils';
import { isStringObject } from '../guards/isStringObject';

/**
 * Asserts that input is String object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as String
 * assertIsStringObject(new String('abc'));
 *
 * // throws
 * assertIsStringObject('abc');
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsStringObject = createTypeAssertion<String>(isStringObject);
