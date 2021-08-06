import { createTypeGuard } from './createTypeGuard';

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
 *
 * // throws TypeError
 * isString([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isString = createTypeGuard<string>(
    (value) => typeof value === 'string',
    'string',
);
