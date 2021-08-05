import { BaseTypeGuardOptions, TypeValidator } from '../types';
import { createTypeGuard } from './createTypeGuard';
import { isObject } from './isObject';
import { toObjectString } from '../utils';

/**
 * Checks that input is record
 *
 * @remarks
 * - The Record interface is construed here as representing an object literal
 *
 * @category Type Guards
 * @example
 *
 * ```typescript
 * // true, typed as Map<unknown, unknown>
 * isRecord(new Map([['xyz', 'abc']]));
 *
 * // true, typed as Map<unknown, string>
 * isRecord<string>(new Map([['xyz', 'abc']]), { valueGuard: isString });
 *
 * // true, typed as Map<string, unknown>
 * isRecord<string>(new Map([['xyz', 'abc']]), { keyGuard: isString });
 *
 * // true, typed as Map<string, string>
 * isRecord<string, string>(new Map([['xyz', 'abc']]), {
 *     keyGuard: isString,
 *     valueGuard: isString,
 * });
 *
 * // false
 * isRecord<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isString },
 * );
 *
 * // true, typed as Map<string, string | number>
 * isRecord<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     { keyGuard: isString, valueGuard: isUnion(isString, isNumber) },
 * );
 *
 * // throws type error
 * isRecord<string, string>(
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
export function isRecord(
    input: unknown,
    options?: BaseTypeGuardOptions,
): input is Record<string, unknown>;
export function isRecord<K extends string | symbol>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        keyGuard: TypeValidator;
    },
): input is Record<K, unknown>;
export function isRecord<V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
    },
): input is Record<string, V>;
export function isRecord<K extends string | symbol, V>(
    input: unknown,
    options?: BaseTypeGuardOptions & {
        valueGuard: TypeValidator;
        keyGuard: TypeValidator;
    },
): input is Record<K, V>;
export function isRecord<K extends string | symbol, V>(
    input: unknown,
    {
        throwError = false,
        valueGuard,
        keyGuard,
    }: BaseTypeGuardOptions & {
        valueGuard?: TypeValidator;
        keyGuard?: TypeValidator;
    } = {},
): input is Record<K, V> {
    return createTypeGuard<Record<K, V>>(
        (value) =>
            isObject(value) &&
            toObjectString(value) === '[object Object]' &&
            (!valueGuard || Object.values(value).every(valueGuard)) &&
            (!keyGuard || Object.keys(value).every(keyGuard)),
        'map',
    )(input, { throwError });
}
