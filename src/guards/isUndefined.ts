import { createTypeGuard } from '../utils';

/**
 * Checks that input is undefined
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isUndefined(undefined);
 *
 * // false
 * isUndefined(null);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isUndefined = createTypeGuard<undefined>(
    (value) => typeof value === 'undefined',
);
