import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';
import { isIterable } from '../guards/isIterable';

/**
 * @remarks
 * This guard tests for Symbol.iterator, which defines the Iterable protocol.
 * See:
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Iteration_protocols}
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsIterable<T = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Iterable<T> {
    return createTypeAssertion<Iterable<T>>(isIterable)(input, options);
}
