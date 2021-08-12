import { createTypeAssertion } from '../utils';
import { isSharedArrayBuffer } from '../guards/isSharedArrayBuffer';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsSharedArrayBuffer =
    createTypeAssertion<SharedArrayBuffer>(isSharedArrayBuffer);
