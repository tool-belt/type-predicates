import { ErrorMessage } from '../types';
import { createTypeAssertion } from '../utils';
import { isFunction } from '../guards/isFunction';

/**
 * @remarks
 * This guard works only in ES2018 and above
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as Function
 * assertIsFunction(() => true);
 *
 * // does not throw, value is typed as () => boolean
 * assertIsFunction<() => boolean>(() => true);
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
 * ```
 *
 * @throws TypeError
 */
export function assertIsFunction<T extends Function = Function>(
    input: unknown,
    options?: ErrorMessage,
): asserts input is T {
    return createTypeAssertion<T>(isFunction)(input, options);
}
