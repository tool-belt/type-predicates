import { ValueValidator } from '../types';
import { createTypeGuard } from '../utils';

/**
 * Checks that input is Array object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, typed as unknown[]
 * isArray(['xyz']);
 *
 * // true, typed as string[]
 * isArray<string>(['xyz'], { valueValidator: isString });
 *
 * // false
 * isArray<string>(['xyz', 1], { valueValidator: isString });
 *
 * // true, typed as string | number[]
 * isArray<string | number>(['xyz', 1], {
 *     valueValidator: isUnion(isString, isNumber),
 * });
 *
 * // throws type error
 * isArray<string>(['xyz', 1], {
 *     valueValidator: isString,
 *     throwError: true,
 * });
 * ```
 *
 * @typeParam T - Type of array value
 * @param input - Value to be tested
 * @param options - Optional validator: valueValidator
 * @returns Boolean
 */
export function isArray(
    input: unknown,
    options?: undefined,
): input is unknown[];
export function isArray<T>(
    input: unknown,
    options?: ValueValidator,
): input is T[];
export function isArray<T>(
    input: unknown,
    options?: ValueValidator,
): input is T[] {
    return createTypeGuard<T[]>(
        (value) =>
            Array.isArray(value) &&
            (!options?.valueValidator || value.every(options.valueValidator)),
    )(input);
}
