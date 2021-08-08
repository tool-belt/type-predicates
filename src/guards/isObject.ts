import { createTypeGuard } from '../utils';

/**
 * Checks that input is object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isObject({});
 *
 * // true
 * isObject([]);
 *
 * // false
 * isObject(() => null);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isObject = createTypeGuard<object>(
    (value) => typeof value === 'object' && value !== null,
);
