import { createTypeAssertion } from '../utils';
import { isAnyArrayBuffer } from '../guards/isAnyArrayBuffer';

/**
 * Asserts that input is either ArrayBuffer or SharedArrayBuffer object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as ArrayBuffer | SharedArrayBuffer
 * assertIsAnyArrayBuffer(new SharedArrayBuffer());
 *
 * // does not throw, value is typed as ArrayBuffer | SharedArrayBuffer
 * assertIsAnyArrayBuffer(new ArrayBuffer());
 *
 * // throws
 * assertIsAnyArrayBuffer([]);
 *
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export const assertIsAnyArrayBuffer = createTypeAssertion<
    ArrayBuffer | SharedArrayBuffer
>(isAnyArrayBuffer);
