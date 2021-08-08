import { createTypeAssertion } from '../utils';
import { isWeakMap } from '../guards/isWeakMap';

/**
 * Asserts that input is WeakMap<K, V> object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as WeakMap<any, unknown>
 * assertIsWeakMap(new WeakMap([[myObj, 'abc']]));
 *
 * // does not throw, value is typed as WeakMap<MyObj, string>
 * assertIsWeakMap<MyObj, string>(new WeakMap([[myObj, 'abc']]));
 *
 * // throws
 * assertIsWeakMap<MyObj, string>(new Map([['abc', 'def']]));
 * ```
 *
 * @typeParam K - Type of WeakMap keys, extends object and defaults to any
 * @typeParam V - Type of WeakMap values, defaults to unknown
 * @param input - Value to be tested
 * @returns Void
 * @throws TypeError
 */
export function assertIsWeakMap<K extends object = any, V = unknown>(
    input: unknown,
): asserts input is WeakMap<K, V> {
    return createTypeAssertion<WeakMap<K, V>>(isWeakMap)(input);
}
