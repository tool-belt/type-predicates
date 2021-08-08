import { createTypeGuard } from '../utils';

/**
 * Checks that input is string primitive
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isString('xyz');
 *
 * // false, because String constructor returns object
 * isString(new String('xyz'));
 *
 * // false
 * isString(1);
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isString = createTypeGuard<string>(
    (value) => typeof value === 'string',
);
