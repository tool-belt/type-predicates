import { ErrorMessage } from '../types';
import { isNull } from '../guards/isNull';
import { isUndefined } from '../guards/isUndefined';

/**
 * @remarks
 * Tests false for undefined and null, true for all other values
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNotNullish<T>(
    input: T | undefined | null,
    options?: ErrorMessage,
): asserts input is T {
    if (isUndefined(input) || isNull(input)) {
        throw TypeError(options?.message);
    }
}
