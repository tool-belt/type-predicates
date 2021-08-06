import { createTypeGuard } from './createTypeGuard';

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
 *
 * // throws TypeError
 * isNull('', { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isNull = createTypeGuard<null>((value) => value === null, 'null');
