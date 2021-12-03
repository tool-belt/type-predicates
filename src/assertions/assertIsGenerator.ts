import { isGenerator } from '../guards/isGenerator';
import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsGenerator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Generator<Y, R, N> {
    return createTypeAssertion<Generator<Y, R, N>>(isGenerator)(input, options);
}
