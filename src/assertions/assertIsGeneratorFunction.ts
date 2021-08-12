import { TypedGeneratorFunction } from '../types';
import { createTypeAssertion } from '../utils';
import { isGeneratorFunction } from '../guards/isGeneratorFunction';

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
>(input: unknown): asserts input is TypedGeneratorFunction<Y, R, N> {
    return createTypeAssertion<TypedGeneratorFunction<Y, R, N>>(
        isGeneratorFunction,
    )(input);
}
