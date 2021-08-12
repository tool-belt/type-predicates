import { createTypeAssertion } from '../utils';
import { isAsyncGenerator } from '../guards/isAsyncGenerator';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAsyncGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): asserts input is AsyncGenerator<Y, R, N> {
    return createTypeAssertion<AsyncGenerator<Y, R, N>>(isAsyncGenerator)(
        input,
    );
}
