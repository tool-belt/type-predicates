import { createTypeGuard } from '../utils';

/**
 * Checks that input is null
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isNull(null);
 *
 * // false
 * isNull(undefined);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isNull = createTypeGuard<null>((value) => value === null);
