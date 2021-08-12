import { createTypeGuard } from '../utils';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBigInt(BigInt(9007199254740991));
 *
 * // true
 * isBigInt(9007199254740991n);
 * ```
 */
export const isBigInt = createTypeGuard<bigint>(
    (value) => typeof value === 'bigint',
);
