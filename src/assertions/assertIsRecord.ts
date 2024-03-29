import { isRecord } from '../guards/isRecord';
import { ErrorMessage, KeyValidator, ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';

/**
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
 * ```
 *
 * @throws TypeError
 */
export function assertIsRecord(
    input: unknown,
): asserts input is Record<string | symbol, unknown>;
export function assertIsRecord(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Record<string | symbol, unknown>;
export function assertIsRecord<K extends string | symbol>(
    input: unknown,
    options: KeyValidator,
): asserts input is Record<K, unknown>;
export function assertIsRecord<K extends string | symbol>(
    input: unknown,
    options: KeyValidator & ErrorMessage,
): asserts input is Record<K, unknown>;
export function assertIsRecord<V>(
    input: unknown,
    options: ValueValidator,
): asserts input is Record<string, V>;
export function assertIsRecord<V>(
    input: unknown,
    options: ValueValidator & ErrorMessage,
): asserts input is Record<string, V>;
export function assertIsRecord<K extends string | symbol, V>(
    input: unknown,
    options: ValueValidator & KeyValidator,
): asserts input is Record<K, V>;
export function assertIsRecord<K extends string | symbol, V>(
    input: unknown,
    options: ValueValidator & KeyValidator & ErrorMessage,
): asserts input is Record<K, V>;
export function assertIsRecord<K extends string | symbol, V>(
    input: unknown,
    options?: Partial<ValueValidator & KeyValidator & ErrorMessage>,
): asserts input is Record<K, V> {
    createTypeAssertion<
        Record<K, V>,
        Partial<ValueValidator & KeyValidator & ErrorMessage> | undefined
    >(isRecord)(input, options);
}
