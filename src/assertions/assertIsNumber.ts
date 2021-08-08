import { createTypeAssertion } from '../utils';
import { isNumber } from '../guards/isNumber';

/**
 * Asserts that input is number primitive
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as number
 * assertIsNumber('abc');
 *
 * // throws
 * assertIsNumber(null);
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsNumber = createTypeAssertion<number>(isNumber);
