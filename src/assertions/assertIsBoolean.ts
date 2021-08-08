import { createTypeAssertion } from '../utils';
import { isBoolean } from '../guards/isBoolean';

/**
 * Asserts that input is boolean primitive
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as boolean
 * assertIsBoolean(false);
 *
 * // throws
 * assertIsBoolean(null);
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsBoolean = createTypeAssertion<boolean>(isBoolean);
