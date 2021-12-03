import { isIterator } from '../guards/isIterator';
import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsIterator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is Iterator<Y, R, N> {
    return createTypeAssertion<Iterator<Y, R, N>>(isIterator)(input, options);
}
