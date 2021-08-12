import { createTypeAssertion } from '../utils';
import { isNull } from '../guards/isNull';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsNull = createTypeAssertion<null>(isNull);
