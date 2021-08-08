import { createTypeAssertion } from '../utils';
import { isFunction } from '../guards/isFunction';

/**
 * Asserts that input is a function
 *
 * @remarks
 * - This function excludes class declarations
 * - This guard works only in ES2018 and above
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Function
 * assertIsFunction(() => true)
 *
 * // does not throw, value is typed as () => boolean
 * assertIsFunction<() => boolean>(() => true)
 *
 * // throws
 * assertIsFunction(async () => Promise.resolve(null));
 *
 * // throws
 * assertIsFunction(function* () {});
 *
 * // throws
 * assertIsFunction(async function* () {});
 *
 * // throws
 * assertIsFunction(MyClass);
 *
 * @typeParam T - Type of function, defaults to Function
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsFunction<T extends Function = Function>(
    input: unknown,
): asserts input is T {
    return createTypeAssertion<T>(isFunction)(input);
}
