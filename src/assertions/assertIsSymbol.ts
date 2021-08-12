import { createTypeAssertion } from '../utils';
import { isSymbol } from '../guards/isSymbol';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsSymbol = createTypeAssertion<symbol>(isSymbol);
