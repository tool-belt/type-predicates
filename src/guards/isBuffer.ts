import { createTypeGuard } from '../utils';

/**
 * Checks that input is Buffer object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBuffer(Buffer.alloc(8));
 *
 * // false
 * isBuffer(1);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isBuffer = createTypeGuard<Buffer>(
    (value) => typeof Buffer !== 'undefined' && value instanceof Buffer,
);
