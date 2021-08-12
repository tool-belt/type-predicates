import { createTypeAssertion } from '../utils';
import { isBoolean } from '../guards/isBoolean';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBoolean = createTypeAssertion<boolean>(isBoolean);
