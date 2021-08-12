import { isNull } from '../guards/isNull';

/**
 * @remarks
 * This assertion asserts that the value is not null, use assertIsNotNullish to
 * also exclude undefined
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsNotNull<T>(input: T | null): asserts input is T {
    if (isNull(input)) {
        throw TypeError();
    }
}
