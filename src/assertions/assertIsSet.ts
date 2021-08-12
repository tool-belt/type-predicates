import { ValueValidator } from '../types';
import { createTypeAssertion } from '../utils';
import { isSet } from '../guards/isSet';

/**
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // doesn't throw, value is typed as Set<any>
 * assertIsSet(new Set(['xyz']));
 *
 * // doesn't throw, value is typed as Set<string>
 * assertIsSet<string>(new Set(['xyz']), { valueValidator: isString });
 * ```
 *
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
