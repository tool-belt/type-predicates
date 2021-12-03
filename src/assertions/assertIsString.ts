import { isString } from '../guards/isString';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsString = createTypeAssertion<string>(isString);
