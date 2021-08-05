import { createTypeGuard } from './createTypeGuard';

/**
 * Checks that input is undefined
 *
 * @category Type Guards
 * @example
 *
 * ```typescript
 * // true
 * isUndefined(undefined);
 *
 * // false
 * isUndefined(null);
 *
 * // throws TypeError
 * isUndefined('', { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isUndefined = createTypeGuard<undefined>(
    (value) => typeof value === 'undefined',
    'undefined',
);
