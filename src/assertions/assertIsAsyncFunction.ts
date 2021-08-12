import { AsyncFunction, isAsyncFunction } from '../guards/isAsyncFunction';
import { createTypeAssertion } from '../utils';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAsyncFunction<T = unknown>(
    input: unknown,
): asserts input is AsyncFunction<T> {
    return createTypeAssertion<AsyncFunction<T>>(isAsyncFunction)(input);
}
