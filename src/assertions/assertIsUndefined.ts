import { isUndefined } from '../guards/isUndefined';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsUndefined = createTypeAssertion<undefined>(isUndefined);
