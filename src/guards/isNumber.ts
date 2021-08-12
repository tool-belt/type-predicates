import { createTypeGuard } from '../utils';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isNumber(1);
 *
 * // false
 * isNumber(new Number(1));
 *
 * // false
 * isNumber(new BigInt(9007199254740991n));
 * ```
 */
export const isNumber = createTypeGuard<number>(
    (value) => typeof value === 'number',
);
