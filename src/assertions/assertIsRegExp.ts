import { isRegExp } from '../guards/isRegExp';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsRegExp(new RegExp('abc'));
 *
 * // does not throw
 * assertIsRegExp(/'abc'/);
 * ```
 *
 * @throws TypeError
 */
export const assertIsRegExp = createTypeAssertion<RegExp>(isRegExp);
