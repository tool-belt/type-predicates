import { createTypeGuard } from '../utils';

/**
 * Checks that input is boolean primitive
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBoolean(false);
 *
 * // false
 * isBoolean(null);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isBoolean = createTypeGuard<boolean>(
    (value) => typeof value === 'boolean',
);
