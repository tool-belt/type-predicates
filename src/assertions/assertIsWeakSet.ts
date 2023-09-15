import { isWeakSet } from '../guards/isWeakSet';
import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsWeakSet<T extends object = any>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is WeakSet<T> {
    createTypeAssertion<WeakSet<T>>(isWeakSet)(input, options);
}
