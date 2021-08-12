import { createTypeAssertion } from '../utils';
import { isNumberObject } from '../guards/isNumberObject';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsNumberObject(new Number(1));
 *
 * // throws
 * assertIsNumberObject(1);
 * ```
 *
 * @throws TypeError
 */
export const assertIsNumberObject = createTypeAssertion<Number>(isNumberObject);
