import { createTypeGuard } from '../utils';

/**
 * Checks that input is Buffer object
 *
 * @remarks
 * - The Buffer object is not available in all JS envs.
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBuffer(new Buffer(8));
 *
 * // false
 * isBuffer('xyz');
 *
 * // false
 * isBuffer(1);
 *
 * // throws TypeError
 * isBuffer([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isBuffer = createTypeGuard<Buffer>(
    (value) => typeof Buffer !== 'undefined' && value instanceof Buffer,
);
