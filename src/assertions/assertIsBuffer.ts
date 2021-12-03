import { isBuffer } from '../guards/isBuffer';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBuffer = createTypeAssertion<Buffer>(isBuffer);
