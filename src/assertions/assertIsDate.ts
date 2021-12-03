import { isDate } from '../guards/isDate';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsDate = createTypeAssertion<Date>(isDate);
