import { ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';
import { isArray } from '../guards/isArray';

/**
 * Asserts that input is Array object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // doesn't throw, value is typed as unknown[]
 * assertArray(['xyz']);
 *
 * // doesn't throw, value is typed as string[]
 * isArray<string>(['xyz'], { valueValidator: isString });
 *
 * // throws
 * isArray<string>(['xyz', 1], { valueValidator: isString });
 *
 * // throws
 * isArray<string>('abc', { valueValidator: isString });
 * ```
 *
 * @typeParam T - Type of array value
 * @param input - Value to be tested
 * @param options - Optional validator: valueValidator
 * @returns Void
 * @throws TypeError
 */
export function assertArray<T = unknown>(
    input: unknown,
    options: undefined,
): asserts input is unknown[];
export function assertArray<T = unknown>(
    input: unknown,
    options: ValueValidator,
): asserts input is T[];
export function assertArray<T = unknown>(
    input: unknown,
    options?: ValueValidator,
): asserts input is T[] {
    return createTypeAssertion<T[], ValueValidator | undefined>(isArray)(
        input,
        options,
    );
}
