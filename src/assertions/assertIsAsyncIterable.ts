import { isAsyncIterable } from '../guards/isAsyncIterable';
import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @remarks
 * This guard tests for Symbol.asyncIterator. See:
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/asyncIterator}
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAsyncIterable<T = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is AsyncIterable<T> {
    createTypeAssertion<AsyncIterable<T>>(isAsyncIterable)(input, options);
}
