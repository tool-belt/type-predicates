import { createTypeAssertion } from '../utils';
import { isDate } from '../guards/isDate';

/**
 * Asserts that input is Date object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Date
 * assertIsDate(new Date(new Date()));
 *
 * // throws
 * assertIsDate('abc');
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsDate = createTypeAssertion<Date>(isDate);
