import { isAnyArrayBuffer } from '../guards/isAnyArrayBuffer';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsAnyArrayBuffer = createTypeAssertion<
    ArrayBuffer | SharedArrayBuffer
>(isAnyArrayBuffer);
