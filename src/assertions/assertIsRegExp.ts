import { createTypeAssertion } from '../utils';
import { isRegExp } from '../guards/isRegExp';

/**
 * Asserts that input is RegExp object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as RegExp
 * assertIsRegExp(new RegExp('abc'));
 *
 * // does not throw, value is typed as RegExp
 * assertIsRegExp(/'abc'/);
 *
 * // throws
 * assertIsRegExp('abc');
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsRegExp = createTypeAssertion<RegExp>(isRegExp);
