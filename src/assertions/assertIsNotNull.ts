import { isNull } from '../guards/isNull';
import { ErrorMessage } from '../types';

/**
 * @remarks
 * This assertion asserts that the value is not null, use assertIsNotNullish to
 * also exclude undefined
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNotNull<T>(
    input: T | null,
    options?: ErrorMessage,
): asserts input is T {
    if (isNull(input)) {
        throw TypeError(options?.message);
    }
}
