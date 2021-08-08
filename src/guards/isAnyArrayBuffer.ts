import { isArrayBuffer } from './isArrayBuffer';
import { isSharedArrayBuffer } from './isSharedArrayBuffer';
import { isUnion } from './isUnion';

/**
 * Checks that input is either ArrayBuffer or SharedArrayBuffer object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isAnySharedArrayBuffer(new SharedArrayBuffer());
 *
 * // true
 * isAnySharedArrayBuffer(new ArrayBuffer());
 *
 * // false
 * isSharedArrayBuffer([]);
 *
 * @param input - Value to be tested
 * @returns Boolean
 * ```
 */
export const isAnyArrayBuffer = isUnion<ArrayBuffer | SharedArrayBuffer>(
    isArrayBuffer,
    isSharedArrayBuffer,
);
