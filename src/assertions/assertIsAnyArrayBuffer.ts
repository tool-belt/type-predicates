import { createTypeAssertion } from '../utils';
import { isAnyArrayBuffer } from '../guards/isAnyArrayBuffer';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsAnyArrayBuffer = createTypeAssertion<
    ArrayBuffer | SharedArrayBuffer
>(isAnyArrayBuffer);
