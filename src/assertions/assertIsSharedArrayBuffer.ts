import { isSharedArrayBuffer } from '../guards/isSharedArrayBuffer';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export const assertIsSharedArrayBuffer =
    createTypeAssertion<SharedArrayBuffer>(isSharedArrayBuffer);
