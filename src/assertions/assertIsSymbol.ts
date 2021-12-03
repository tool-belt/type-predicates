import { isSymbol } from '../guards/isSymbol';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsSymbol = createTypeAssertion<symbol>(isSymbol);
