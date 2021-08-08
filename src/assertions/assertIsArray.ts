import { ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';
import { isArray } from '../guards/isArray';

/**
 * Asserts that input is Array<T> object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // doesn't throw, value is typed as any[]
 * assertIsArray(['xyz']);
 *
 * // doesn't throw, value is typed as string[]
 * assertIsArray<string>(['xyz'], { valueValidator: isString });
 *
 * // throws
 * assertIsArray<string>(['xyz', 1], { valueValidator: isString });
 *
 * // throws
 * assertIsArray<string>('abc', { valueValidator: isString });
 * ```
 *
 * @typeParam T - Type of A value
 * @param input - Value to be tested
 * @param options - Optional valueValidator
 * @returns Void
 * @throws TypeError
 */
export function assertIsArray(input: unknown): asserts input is any[];
export function assertIsArray<T>(
    input: unknown,
    options: ValueValidator,
): asserts input is T[];
export function assertIsArray<T>(
    input: unknown,
    options?: ValueValidator,
): asserts input is T[] {
    return createTypeAssertion<T[], ValueValidator | undefined>(isArray)(
        input,
        options,
    );
}
