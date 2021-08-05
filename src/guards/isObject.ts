import { createTypeGuard } from './createTypeGuard';

/**
 * Checks that input is object
 *
 * @category Type Guards
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
 * isObject(() => null);
 *
 * // false
 * isObject(1);
 *
 * // throws TypeError
 * isObject('xyz', { throwError: true });
 * ```
 *
 * @param input - Value to be tested
 * @param throwError - Throw error if check fails
 * @returns Boolean
 * @throws TypeError
 */
export const isObject = createTypeGuard<object>(
    (value) => typeof value === 'object' && value !== null,
    'object',
);
