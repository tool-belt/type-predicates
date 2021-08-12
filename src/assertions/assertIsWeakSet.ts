import { createTypeAssertion } from '../utils';
import { isWeakSet } from '../guards/isWeakSet';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsWeakSet<T extends object = any>(
    input: unknown,
): asserts input is WeakSet<T> {
    return createTypeAssertion<WeakSet<T>>(isWeakSet)(input);
}
