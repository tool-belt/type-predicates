import { createTypeAssertion } from '../utils';
import { isBooleanObject } from '../guards/isBooleanObject';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBooleanObject =
    createTypeAssertion<Boolean>(isBooleanObject);
