import { KeyValidator, ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';
import { isRecord } from '../guards/isRecord';

/**
 * Asserts that input is Record<K, V>
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Record<string | symbol, any>
 * assertIsRecord({ key1: 'aaa', key2: 123 });
 *
 * // does not throw, value is typed as Record<string, string | number>
 * assertIsRecord<string, string | number>(
 *     { key1: 'aaa', key2: 123 },
 *     {
 *         keyValidator: isString,
 *         valueValidator: isUnion(isString, isNumber),
 *     },
 * );
 *
 * // throws
 * assertIsRecord<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 * );
 * ```
 *
 * @typeParam K - Type of Record keys
 * @typeParam V - Type of Record values
 * @param input - Value to be tested
 * @param options - Optional validators: keyValidator, valueValidator
 * @returns Void
 * @throws TypeError
 */
export function assertIsRecord(
    input: unknown,
): asserts input is Record<string | symbol, unknown>;
export function assertIsRecord<K extends string | symbol>(
    input: unknown,
    options: KeyValidator,
): asserts input is Record<K, unknown>;
export function assertIsRecord<V>(
    input: unknown,
    options: ValueValidator,
): asserts input is Record<string, V>;
export function assertIsRecord<K extends string | symbol, V>(
    input: unknown,
    options: ValueValidator & KeyValidator,
): asserts input is Record<K, V>;
export function assertIsRecord<K extends string | symbol, V>(
    input: unknown,
    options?: Partial<ValueValidator & KeyValidator>,
): asserts input is Record<K, V> {
    return createTypeAssertion<
        Record<K, V>,
        undefined | Partial<ValueValidator & KeyValidator>
    >(isRecord)(input, options);
}
