import { createTypeAssertion } from '../utils';
import { isArrayBuffer } from '../guards/isArrayBuffer';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsArrayBuffer =
    createTypeAssertion<ArrayBuffer>(isArrayBuffer);
