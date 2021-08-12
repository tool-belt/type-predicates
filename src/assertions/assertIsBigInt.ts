import { createTypeAssertion } from '../utils';
import { isBigInt } from '../guards/isBigInt';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw
 * assertIsBigInt(BigInt(9007199254740991));
 *
 * // throws
 * assertIsBigInt(9007199254740991n);
 * ```
 *
 * @throws TypeError
 */
export const assertIsBigInt = createTypeAssertion<bigint>(isBigInt);
