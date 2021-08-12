import { createTypeAssertion } from '../utils';
import { isIterator } from '../guards/isIterator';

/**
 * @remarks
 * This assertion works only in ES2018 and above
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsIterator<Y = unknown, R = unknown, N = unknown>(
    input: unknown,
): asserts input is Iterator<Y, R, N> {
    return createTypeAssertion<Iterator<Y, R, N>>(isIterator)(input);
}
