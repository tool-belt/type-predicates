import { ValueValidator } from '../types';
import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is Set<T> object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, typed as Set<any>
 * isSet(new Set(['xyz']));
 *
 * // true, typed as Set<string>
 * isSet<string>(new Set(['xyz']), { valueValidator: isString });
 *
 * // false
 * isSet<string>(new Set(['xyz', 1]), { valueValidator: isString });
 *
 * // true, typed as Set<string | number>
 * isSet<string | number>(new Set(['xyz', 1]), {
 *     valueValidator: isUnion(isString, isNumber),
 * });
 *
 * // throws type error
 * isSet<string>(new Set(['xyz', 1]), {
 *     valueValidator: isString,
 * });
 * ```
 *
 * @typeParam T - Type of Set value
 * @param input - Value to be tested
 * @param options - Optional valueValidator
 * @returns Boolean
 */
export function isSet(input: unknown): input is Set<any>;
export function isSet<T>(
    input: unknown,
    options: ValueValidator,
): input is Set<T>;
export function isSet<T>(
    input: unknown,
    options?: ValueValidator,
): input is Set<T> {
    return createTypeGuard<Set<T>, ValueValidator | undefined>(
        (value) =>
            isObject(value) &&
            (toObjectString(value) === '[object Set]' ||
                value instanceof Set) &&
            (!options?.valueValidator ||
                [...(value as Set<any>)].every(options.valueValidator)),
    )(input);
}
