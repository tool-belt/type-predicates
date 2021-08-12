import { createTypeAssertion } from '../utils';
import { isString } from '../guards/isString';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsString = createTypeAssertion<string>(isString);
