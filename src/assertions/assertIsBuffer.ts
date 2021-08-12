import { createTypeAssertion } from '../utils';
import { isBuffer } from '../guards/isBuffer';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsBuffer = createTypeAssertion<Buffer>(isBuffer);
