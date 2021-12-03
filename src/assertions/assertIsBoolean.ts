import { isBoolean } from '../guards/isBoolean';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBoolean = createTypeAssertion<boolean>(isBoolean);
