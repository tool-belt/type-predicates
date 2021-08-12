import { createTypeGuard } from '../utils';

/**
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isBoolean(false);
 *
 * // false
 * isBoolean(new Boolean(false));
 * ```
 */
export const isBoolean = createTypeGuard<boolean>(
    (value) => typeof value === 'boolean',
);
