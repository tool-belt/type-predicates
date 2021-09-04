import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';
import { isWeakSet } from '../guards/isWeakSet';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsWeakSet<T extends object = any>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is WeakSet<T> {
    return createTypeAssertion<WeakSet<T>>(isWeakSet)(input, options);
}
