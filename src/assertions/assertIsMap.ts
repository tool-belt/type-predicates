import { ErrorMessage, KeyValidator, ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';
import { isMap } from '../guards/isMap';

/**
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
 * ```
 *
 * @throws TypeError
 */
export function assertIsMap(
    input: unknown,
): asserts input is Map<unknown, unknown>;
export function assertIsMap(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Map<unknown, unknown>;
export function assertIsMap<K>(
    input: unknown,
    options: KeyValidator,
): asserts input is Map<K, unknown>;
export function assertIsMap<K>(
    input: unknown,
    options: KeyValidator & ErrorMessage,
): asserts input is Map<K, unknown>;
export function assertIsMap<V>(
    input: unknown,
    options: ValueValidator,
): asserts input is Map<string, V>;
export function assertIsMap<V>(
    input: unknown,
    options: ValueValidator & ErrorMessage,
): asserts input is Map<string, V>;
export function assertIsMap<K, V>(
    input: unknown,
    options: ValueValidator & KeyValidator,
): asserts input is Map<K, V>;
export function assertIsMap<K, V>(
    input: unknown,
    options: ValueValidator & KeyValidator & ErrorMessage,
): asserts input is Map<K, V>;
export function assertIsMap<K, V>(
    input: unknown,
    options?: Partial<ValueValidator & KeyValidator & ErrorMessage>,
): asserts input is Map<K, V> {
    return createTypeAssertion<
        Map<K, V>,
        Partial<ValueValidator & KeyValidator & ErrorMessage> | undefined
    >(isMap)(input, options);
}
