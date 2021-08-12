import { createTypeAssertion } from '../utils';
import { isNullish } from '../guards/isNullish';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsNullish = createTypeAssertion<null | undefined>(isNullish);
