import { isArrayBuffer } from '../guards/isArrayBuffer';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsArrayBuffer =
    createTypeAssertion<ArrayBuffer>(isArrayBuffer);
