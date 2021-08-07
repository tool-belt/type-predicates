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
 * isBoolean(1);
 *
 * // false
 * isBoolean('xyz');
 *
 * // throws TypeError
 * isBoolean([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isBoolean = createTypeGuard<boolean>(
    (value) => typeof value === 'boolean',
    'boolean',
);
