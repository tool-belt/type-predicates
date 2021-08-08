import { KeyValidator, ValueValidator } from '../types';
import { createTypeGuard, toObjectString } from '../utils';
import { isObject } from './isObject';

/**
 * Checks that input is Record
 *
 * @remarks
 * - The Record interface is construed here as representing an object literal
 *
 * @category Type Guard
 * @example
 *
 * ```typescript
 *  * // true, typed as Record<string, unknown>
 * isRecord(
 *     { key1: 'aaa', key2: 123 },
 * );
 *
 * // true, typed as Record<string, string | number>
 * isRecord<string, string | number>(
 *     { key1: 'aaa', key2: 123 },
 *     {
 *         keyValidator: isString,
 *         valueValidator: isUnion(isString, isNumber),
 *     },
 * );
 *
 * // false
 * isRecord<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 * );
 * ```
 *
 * @typeParam T - Type of map value
 * @param input - Value to be tested
 * @param options - Optional validators: keyValidator, valueValidator
 * @returns Boolean
 */
export function isRecord(
    input: unknown,
    options?: undefined,
): input is Record<string, unknown>;
export function isRecord<K extends string | symbol>(
    input: unknown,
    options?: KeyValidator,
): input is Record<K, unknown>;
export function isRecord<V>(
    input: unknown,
    options?: ValueValidator,
): input is Record<string, V>;
export function isRecord<K extends string | symbol, V>(
    input: unknown,
    options?: ValueValidator & KeyValidator,
): input is Record<K, V>;
export function isRecord<K extends string | symbol, V>(
    input: unknown,
    options?: Partial<ValueValidator & KeyValidator>,
): input is Record<K, V> {
    return createTypeGuard<Record<K, V>>(
        (value) =>
            isObject(value) &&
            toObjectString(value) === '[object Object]' &&
            (!options?.valueValidator ||
                Object.values(value).every(options.valueValidator)) &&
            (!options?.keyValidator ||
                Object.keys(value).every(options.keyValidator)),
    )(input);
}
