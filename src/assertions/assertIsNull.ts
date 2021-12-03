import { isNull } from '../guards/isNull';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsNull = createTypeAssertion<null>(isNull);
