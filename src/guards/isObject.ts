import { createTypeGuard } from '../utils';

/**
 * @remarks
 * Tests true for all objects that have a typeof 'object' excluding null
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true
 * isObject({});
 *
 * // true
 * isObject([]);
 *
 * // false
 * isObject(null);
 * ```
 */
export const isObject = createTypeGuard<object>(
    (value) => typeof value === 'object' && value !== null,
);
