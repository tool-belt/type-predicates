import { isGeneratorFunction } from '../guards/isGeneratorFunction';
import { ErrorMessage, TypedGeneratorFunction } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsGeneratorFunction<
    Y = unknown,
    R = unknown,
    N = unknown,
>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is TypedGeneratorFunction<Y, R, N> {
    return createTypeAssertion<TypedGeneratorFunction<Y, R, N>>(
        isGeneratorFunction,
    )(input, options);
}
