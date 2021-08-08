import { createTypeAssertion } from '../utils';
import { isSymbol } from '../guards/isSymbol';

/**
 * Asserts that input is symbol primitive
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as symbol
 * assertIsSymbol(Symbol('abc'));
 *
 * // throws
 * assertIsSymbol(null);
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsSymbol = createTypeAssertion<symbol>(isSymbol);
