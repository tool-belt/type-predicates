import { createTypeAssertion } from '../utils';
import { isStringObject } from '../guards/isStringObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsStringObject = createTypeAssertion<String>(isStringObject);
