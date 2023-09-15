import { isAsyncGenerator } from '../guards/isAsyncGenerator';
import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAsyncGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is AsyncGenerator<Y, R, N> {
    createTypeAssertion<AsyncGenerator<Y, R, N>>(isAsyncGenerator)(
        input,
        options,
    );
}
