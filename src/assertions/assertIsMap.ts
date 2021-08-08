import { KeyValidator, ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';
import { isMap } from '../guards/isMap';

/**
 * Asserts that input is Map<K, V>
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Map<unknown, unknown>
 * assertIsMap(new Map([['xyz', 'abc']]));
 *
 * // does not throw, value is typed as Map<string, string | number>
 * assertIsMap<string, string>(
 *     new Map([
 *         ['abc', 'def'],
 *         ['xyz', 100],
 *     ]),
 *     {
 *         keyValidator: isString,
 *         valueValidator: isUnion(isString, isNumber),
 *     },
 * );
 *
 * // throws
 * assertIsMap<string, string>(['abc', 'def']);
 * ```
 *
 * @typeParam K - Type of Map keys
 * @typeParam V - Type of Map values
 * @param input - Value to be tested
 * @param options - Optional validators: keyValidator, valueValidator
 * @returns Void
 * @throws TypeError
 */
export function assertIsMap(
    input: unknown,
): asserts input is Map<unknown, unknown>;
export function assertIsMap<K>(
    input: unknown,
    options: KeyValidator,
): asserts input is Map<K, unknown>;
export function assertIsMap<V>(
    input: unknown,
    options: ValueValidator,
): asserts input is Map<string, V>;
export function assertIsMap<K, V>(
    input: unknown,
    options: ValueValidator & KeyValidator,
): asserts input is Map<K, V>;
export function assertIsMap<K, V>(
    input: unknown,
    options?: Partial<ValueValidator & KeyValidator>,
): asserts input is Map<K, V> {
    return createTypeAssertion<
        Map<K, V>,
        undefined | Partial<ValueValidator & KeyValidator>
    >(isMap)(input, options);
}
