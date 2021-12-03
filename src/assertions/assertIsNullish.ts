import { isNullish } from '../guards/isNullish';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsNullish = createTypeAssertion<null | undefined>(isNullish);
