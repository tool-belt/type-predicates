import { BaseTypeGuardOptions, TypeValidator } from '../types';
import { createTypeGuard } from './createTypeGuard';
import { isObject } from './isObject';
import { toObjectString } from '../utils';

/**
 * Checks that input is set
 *
 * @category Type Guards
 * @example
 *
 * ```typescript
 * // true, typed as Set<unknown>
 * isSet(new Set(['xyz']));
 *
 * // true, typed as Set<unknown>
 * isSet<string>(new Set(['xyz']));
 *
 * // true, typed as Set<string>
 * isSet<string>(new Set(['xyz']), { valueGuard: isString });
 *
 * // false
 * isSet<string>(new Set(['xyz', 1]), { valueGuard: isString });
 *
 * // true, typed as Set<string | number>
 * isSet<string | number>(new Set(['xyz', 1]), {
 *     valueGuard: isUnion(isString, isNumber),
 * });
 *
 * // throws type error
 * isSet<string>(new Set(['xyz', 1]), {
 *     valueGuard: isString,
 *     throwError: true,
 * });
 * ```
 *
 * @typeParam T - Type of set value
 * @param input - Value to be tested
 * @param options - ThrowError, valueGuard
 * @returns Boolean
 * @throws TypeError
 */
export function isSet(
    input: unknown,
    options?: BaseTypeGuardOptions,
): input is Set<unknown>;
export function isSet<T>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
    },
): input is Set<T>;
export function isSet<T>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
    }: BaseTypeGuardOptions & { valueGuard?: TypeValidator } = {},
): input is Set<T> {
    return createTypeGuard<Set<T>>(
        (value) =>
            isObject(value) &&
            (toObjectString(value) === '[object Set]' ||
                value instanceof Set) &&
            (!valueGuard || [...(value as Set<any>)].every(valueGuard)),
        'set',
    )(input, { throwError });
}
