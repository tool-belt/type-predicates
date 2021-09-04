import { ErrorMessage } from '../types';
import {
    TypedAsyncGeneratorFunction,
    isAsyncGeneratorFunction,
} from '../guards/isAsyncGeneratorFunction';
import { createTypeAssertion } from '../utils';

/**
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsAsyncGeneratorFunction<
    Y = unknown,
    R = unknown,
    N = unknown,
>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is TypedAsyncGeneratorFunction<Y, R, N> {
    return createTypeAssertion<TypedAsyncGeneratorFunction<Y, R, N>>(
        isAsyncGeneratorFunction,
    )(input, options);
}
