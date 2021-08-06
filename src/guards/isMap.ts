import { BaseTypeGuardOptions, TypeValidator } from '../types';
import { createTypeGuard } from './createTypeGuard';
import { isObject } from './isObject';
import { toObjectString } from '../utils';

/**
 * Checks that input is Map object
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 * // true, typed as Map<unknown, unknown>
 * isMap(new Map([['xyz', 'abc']]));
 *
 * // true, typed as Map<unknown, string>
 * isMap<string>(new Map([['xyz', 'abc']]), { valueGuard: isString });
 *
 * // true, typed as Map<string, unknown>
 * isMap<string>(new Map([['xyz', 'abc']]), { keyGuard: isString });
 *
 * // true, typed as Map<string, string>
 * isMap<string, string>(new Map([['xyz', 'abc']]), {
 *     keyGuard: isString,
 *     valueGuard: isString,
 * });
 *
 * // false
 * isMap<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isString },
 * );
 *
 * // true, typed as Map<string, string | number>
 * isMap<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isUnion(isString, isNumber) },
 * );
 *
 * // throws type error
 * isMap<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isString, throwError: true },
 * );
 * ```
 *
 * @typeParam T - Type of map value
 * @param input - Value to be tested
 * @param options - ThrowError, keyGuard, valueGuard
 * @returns Boolean
 * @throws TypeError
 */
export function isMap(
    input: unknown,
    options?: BaseTypeGuardOptions,
): input is Map<unknown, unknown>;
export function isMap<K>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        keyGuard: TypeValidator;
    },
): input is Map<K, unknown>;
export function isMap<V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
    },
): input is Map<unknown, V>;
export function isMap<K, V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
        keyGuard: TypeValidator;
    },
): input is Map<K, V>;
export function isMap<K, V>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
        keyGuard,
    }: BaseTypeGuardOptions & {
        valueGuard?: TypeValidator;
        keyGuard?: TypeValidator;
    } = {},
): input is Map<K, V> {
    return createTypeGuard<Map<K, V>>((value) => {
        if (
            value instanceof Map ||
            (isObject(value) && toObjectString(value) === '[object Map]')
        ) {
            const valuesValid =
                !valueGuard ||
                [...(value as Map<any, any>).values()].every(valueGuard);
            const keysValid =
                !keyGuard ||
                [...(value as Map<any, any>).keys()].every(keyGuard);
            return valuesValid && keysValid;
        }
        return false;
    }, 'map')(input, { throwError });
}
