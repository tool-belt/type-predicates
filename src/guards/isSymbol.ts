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
 * ```
 *
 * @param input - Value to be tested
 * @returns Boolean
 */
export const isSymbol = createTypeGuard<symbol>(
    (value) => typeof value === 'symbol',
);
