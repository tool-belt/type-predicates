import { createTypeAssertion } from '../utils';
import { isBuffer } from '../guards/isBuffer';

/**
 * Asserts that input is Buffer object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Buffer
 * assertIsBuffer(Buffer.alloc(8);
 *
 * // throws
 * assertIsBuffer('abc');
 * ```
 *
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export const assertIsBuffer = createTypeAssertion<Buffer>(isBuffer);
