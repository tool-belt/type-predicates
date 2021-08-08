import { ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';
import { isSet } from '../guards/isSet';

/**
 * Asserts that input is Set<T> object
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // doesn't throw, value is typed as Set<any>
 * assertIsSet(new Set(['xyz']));
 *
 * // doesn't throw, value is typed as Set<string>
 * assertIsSet<string>(new Set(['xyz']), { valueValidator: isString });
 *
 * // throws
 * assertIsSet<string>('abc', { valueValidator: isString });
 * ```
 *
 * @typeParam T - Type of Set value
 * @param input - Value to be tested
 * @param options - Optional valueValidator
 * @returns Void
 * @throws TypeError
 */
export function assertIsSet(input: unknown): asserts input is Set<any>;
export function assertIsSet<T>(
    input: unknown,
    options: ValueValidator,
): asserts input is Set<T>;
export function assertIsSet<T>(
    input: unknown,
    options?: ValueValidator,
): asserts input is Set<T> {
    return createTypeAssertion<Set<T>, ValueValidator | undefined>(isSet)(
        input,
        options,
    );
}
