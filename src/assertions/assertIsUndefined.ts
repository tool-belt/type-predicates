import { createTypeAssertion } from '../utils';
import { isUndefined } from '../guards/isUndefined';

/**
 * Asserts that input is undefined
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as undefined
 * assertIsUndefined(undefined);
 *
 * // throws
 * assertIsUndefined(null);
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsUndefined = createTypeAssertion<undefined>(isUndefined);
