import { createTypeGuard } from '../utils';

/**
 * Checks that input is symbol primitive
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isSymbol(Symbol('My Symbol'));
 *
 * // false
 * isSymbol('My Symbol');
 *
 * // throws TypeError
 * isSymbol([], { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param options - ThrowError
 * @returns Boolean
 * @throws TypeError
 */
export const isSymbol = createTypeGuard<symbol>(
    (value) => typeof value === 'symbol',
    'symbol',
);
