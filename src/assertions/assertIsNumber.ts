import { isNumber } from '../guards/isNumber';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsNumber(1);
 *
 * // throws
 * assertIsNumber(new Number(1));
 * ```
 *
 * @throws TypeError
 */
export const assertIsNumber = createTypeAssertion<number>(isNumber);
