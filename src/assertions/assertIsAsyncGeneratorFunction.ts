import {
    TypedAsyncGeneratorFunction,
    isAsyncGeneratorFunction,
} from '../guards/isAsyncGeneratorFunction';
import { createTypeAssertion } from '../utils';

/**
 * Asserts that input is TypedAsyncGeneratorFunction<Y, R, N> object
 *
 * @remarks
 * - This assertion works only in ES2018 and above
 *
 * @category Type Assertion
 * @example
 *
 * ```typescript
 * // does not throw, value is typed as TypedAsyncGeneratorFunction<unknown, unknown, unknown>
 * assertIsAsyncGeneratorFunction(async function* () {
 *     while (true) {
 *         yield await Promise.resolve(true);
 *     }
 * });
 *
 * // does not throw, value is typed as TypedAsyncGeneratorFunction<boolean, unknown, unknown>
 * assertIsAsyncGeneratorFunction(async function* () {
 *     while (true) {
 *         yield await Promise.resolve(true);
 *     }
 * });
 *
 * // throws
 * assertIsAsyncGeneratorFunction(function* () {});
 *
 * @typeParam Y - Type of yield value, defaults to unknown
 * @typeParam R - Type of return value, defaults to unknown
 * @typeParam N - Type of .next() args, defaults to unknown
 * @param input - Value to be tested
 * @returns void
 * @throws TypeError
 * ```
 */
export function assertIsAsyncGeneratorFunction<
    Y = unknown,
    R = unknown,
    N = unknown,
>(input: unknown): asserts input is TypedAsyncGeneratorFunction<Y, R, N> {
    return createTypeAssertion<TypedAsyncGeneratorFunction<Y, R, N>>(
        isAsyncGeneratorFunction,
    )(input);
}
