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
 * isAnySharedArrayBuffer(new SharedArrayBuffer());
 *
 * // does not throw, value is typed as ArrayBuffer | SharedArrayBuffer
 * isAnySharedArrayBuffer(new ArrayBuffer());
 *
 * // throws
 * isSharedArrayBuffer([]);
 *
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export const assertAnyArrayBuffer = createTypeAssertion<
    ArrayBuffer | SharedArrayBuffer
>(isAnyArrayBuffer);
