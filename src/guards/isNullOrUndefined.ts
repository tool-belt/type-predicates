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
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isNullOrUndefined = isUnion<null | undefined>(isNull, isUndefined);
