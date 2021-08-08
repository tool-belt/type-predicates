import { createTypeAssertion } from '../utils';
import { isNumberObject } from '../guards/isNumberObject';

/**
 * Asserts that input is Number object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Number
 * assertIsNumberObject(new Number(1));
 *
 * // throws
 * assertIsNumberObject(1);
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsNumberObject = createTypeAssertion<Number>(isNumberObject);
