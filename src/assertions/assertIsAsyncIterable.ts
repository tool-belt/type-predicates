import { createTypeAssertion } from '../utils';
import { isAsyncIterable } from '../guards/isAsyncIterable';

/**
 * @remarks
 * This guard tests for Symbol.asyncIterator. See:
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator}
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAsyncIterable<T = unknown>(
    input: unknown,
): asserts input is AsyncIterable<T> {
    return createTypeAssertion<AsyncIterable<T>>(isAsyncIterable)(input);
}
