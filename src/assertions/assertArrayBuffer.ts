import { createTypeAssertion } from '../utils';
import { isArrayBuffer } from '../guards/isArrayBuffer';

/**
 * Asserts that input is ArrayBuffer object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as ArrayBuffer
 * assertArrayBuffer(new ArrayBuffer());
 *
 * // throws
 * assertArrayBuffer([]);
 *
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export const assertArrayBuffer =
    createTypeAssertion<ArrayBuffer>(isArrayBuffer);
