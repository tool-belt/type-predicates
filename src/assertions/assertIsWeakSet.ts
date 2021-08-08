import { createTypeAssertion } from '../utils';
import { isWeakSet } from '../guards/isWeakSet';

/**
 * Asserts that input is WeakSet<K, V> object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as WeakSet<any>
 * assertIsWeakSet(new WeakSet([myObj]));
 *
 * // does not throw, value is typed as WeakSet<MyObj>
 * assertIsWeakSet<MyObj>(new WeakSet([myObj]));
 *
 * // throws
 * assertIsWeakSet<MyObj>(new Set(['abc']));
 * ```
 *
 * @typeParam T - Type of WeakSet values, extends object and defaults to any
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export function assertIsWeakSet<T extends object = any>(
    input: unknown,
): asserts input is WeakSet<T> {
    return createTypeAssertion<WeakSet<T>>(isWeakSet)(input);
}
