import { createTypeAssertion } from '../utils';
import { isBooleanObject } from '../guards/isBooleanObject';

/**
 * Asserts that input is Boolean object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Boolean
 * assertIsBooleanObject(new Boolean(false));
 *
 * // throws
 * assertIsBooleanObject(false);
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsBooleanObject =
    createTypeAssertion<Boolean>(isBooleanObject);
