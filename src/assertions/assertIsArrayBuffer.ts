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
 * assertIsArrayBuffer(new ArrayBuffer());
 *
 * // throws
 * assertIsArrayBuffer([]);
 *
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export const assertIsArrayBuffer =
    createTypeAssertion<ArrayBuffer>(isArrayBuffer);
