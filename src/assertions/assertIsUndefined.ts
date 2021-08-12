import { createTypeAssertion } from '../utils';
import { isUndefined } from '../guards/isUndefined';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsUndefined = createTypeAssertion<undefined>(isUndefined);
