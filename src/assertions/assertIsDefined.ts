import { isUndefined } from '../guards/isUndefined';
import { ErrorMessage } from '../types';

/**
 * @remarks
 * This assertion asserts that the value is not null, use assertIsNotNullish to
 * also exclude undefined
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsDefined<T>(
    input: T | undefined,
    options?: ErrorMessage,
): asserts input is T {
    if (isUndefined(input)) {
        throw TypeError(options?.message);
    }
}
