import { isNull } from './isNull';
import { isUndefined } from './isUndefined';
import { isUnion } from './isUnion';

/**
 * Checks that input is null or undefined
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isNullOrUndefined(null);
 *
 * // true
 * isNullOrUndefined(undefined);
 *
 * // false
 * isBuffer(false);
 *
 * // false
 * isBuffer(0);
 *
 * // throws TypeError
 * isBuffer('', { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isNullOrUndefined = isUnion<null | undefined>(isNull, isUndefined);
