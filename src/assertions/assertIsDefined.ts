import { isUndefined } from '../guards/isUndefined';

/**
 * @remarks
 * This assertion asserts that the value is not null, use assertIsNotNullish to
 * also exclude undefined
 * @category Type Assertion
 * @throws TypeError
 */
export function assertIsDefined<T>(input: T | undefined): asserts input is T {
    if (isUndefined(input)) {
        throw TypeError();
    }
}
