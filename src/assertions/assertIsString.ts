import { createTypeAssertion } from '../utils';
import { isString } from '../guards/isString';

/**
 * Asserts that input is string primitive
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as string
 * assertIsString('abc');
 *
 * // throws
 * assertIsString(null);
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsString = createTypeAssertion<string>(isString);
