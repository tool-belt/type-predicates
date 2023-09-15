import { isWeakMap } from '../guards/isWeakMap';
import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsWeakMap<K extends object = any, V = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is WeakMap<K, V> {
    createTypeAssertion<WeakMap<K, V>>(isWeakMap)(input, options);
}
