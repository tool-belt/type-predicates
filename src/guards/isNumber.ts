import { createTypeGuard } from '../utils';

/**
 * Checks that input is number primitive
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isNumber(1);
 *
 * // false, because Number constructor returns object
 * isNumber(new Number(1));
 *
 * // false
 * isNumber('xyz');
 *
 * // throws TypeError
 * isNumber([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isNumber = createTypeGuard<number>(
    (value) => typeof value === 'number',
    'number',
);
