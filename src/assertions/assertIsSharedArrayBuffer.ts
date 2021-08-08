import { createTypeAssertion } from '../utils';
import { isSharedArrayBuffer } from '../guards/isSharedArrayBuffer';

/**
 * Asserts that input is SharedArrayBuffer object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as SharedArrayBuffer
 * assertIsSharedArrayBuffer(new SharedArrayBuffer());
 *
 * // throws
 * assertIsSharedArrayBuffer([]);
 *
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export const assertIsSharedArrayBuffer =
    createTypeAssertion<SharedArrayBuffer>(isSharedArrayBuffer);
