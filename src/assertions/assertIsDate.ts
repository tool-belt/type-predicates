import { createTypeAssertion } from '../utils';
import { isDate } from '../guards/isDate';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsDate = createTypeAssertion<Date>(isDate);
