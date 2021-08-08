import { createTypeAssertion } from '../utils';
import { isNull } from '../guards/isNull';

/**
 * Asserts that input is null
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as null
 * assertIsNull(null);
 *
 * // throws
 * assertIsNull(undefiend);
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsNull = createTypeAssertion<null>(isNull);
